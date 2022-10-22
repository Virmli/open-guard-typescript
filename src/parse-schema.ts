import { JSONSchema } from 'json-schema-to-typescript'
import { OpenAPIV3_1, OpenAPIV3 } from 'openapi-types'

import { NamedSchema, ParsedSchema } from './types'
import { flatten, isDefined, toPascalCase } from './utils'

/**
 * Transforms an OpenAPI spec in to a single JSON schema
 * @param spec OpenAPI spec document
 * @returns JSON schema of flattened schemas found within spec document
 */
export const parseSchema = (spec: OpenAPIV3_1.Document): ParsedSchema =>
  translateSchemaRefs(
    namedSchemasFromSpec(spec).reduce(appendNamedSchemaToParsedSchema, {
      type: 'object',
      title: 'Schema',
      definitions: {},
      properties: {},
      required: [],
    }),
  )

export const namedSchemasFromSpec = (spec: OpenAPIV3_1.Document): NamedSchema[] =>
  schemasForComponents(spec).concat(schemasForOperations(spec))

export const appendNamedSchemaToParsedSchema = (
  parsedSchema: ParsedSchema,
  { name, definition }: NamedSchema,
): ParsedSchema => {
  parsedSchema.properties[name] = { $ref: `#/definitions/${name}` }
  parsedSchema.definitions[name] = definition
  parsedSchema.required.push(name)
  return parsedSchema
}

export const buildRequestBodySchemaName = (operationId: string): string => toPascalCase(`${operationId}RequestBody`)
export const buildResponseSchemaName = (operationId: string, detail: string): string =>
  toPascalCase(`${operationId}${detail}Response`)

export const hasOperationId = <T>(value: T): value is T & { operationId: string } => 'operationId' in value

/**
 * Parses NamedSchemas for API request bodies for a specific operation
 */
export const requestBodySchemaForOperation = ({
  operationId,
  requestBody,
}: OpenAPIV3_1.OperationObject & { operationId: string }): NamedSchema | undefined =>
  namedSchemaFromOpenAPIObject({
    name: buildRequestBodySchemaName(operationId),
    schema: requestBody,
  })

/**
 * Parses NamedSchemas for API responses for a specific operation
 */
export const responseSchemasForOperation = ({
  operationId,
  responses = {},
}: OpenAPIV3_1.OperationObject & { operationId: string }): NamedSchema[] =>
  Object.entries(responses)
    .map(([responseStatus, responseObject]) =>
      namedSchemaFromOpenAPIObject({
        name: buildResponseSchemaName(operationId, responseObject.description || responseStatus),
        schema: responseObject,
      }),
    )
    .filter(isDefined)

export const schemasForOperation = (operation: OpenAPIV3_1.OperationObject & { operationId: string }): NamedSchema[] =>
  [requestBodySchemaForOperation(operation)].concat(responseSchemasForOperation(operation)).filter(isDefined)

export const schemasForMethodFromPath =
  (path: OpenAPIV3_1.PathItemObject) =>
  (method: OpenAPIV3_1.HttpMethods): NamedSchema[] => {
    const operation = path[method]
    // operation does not exist for method
    if (!operation || !hasOperationId(operation)) return []
    return schemasForOperation(operation)
  }

export const schemasForPath = (path: OpenAPIV3_1.PathItemObject = {}): NamedSchema[] =>
  flatten(Object.values(OpenAPIV3.HttpMethods).map(schemasForMethodFromPath(path)))

/**
 * Parses NamedSchemas from all API operations (paths + methods)
 */
export const schemasForOperations = ({ paths = {} }: OpenAPIV3_1.Document): NamedSchema[] =>
  flatten(Object.values(paths).map(schemasForPath)).filter(isDefined)

export const schemasForSectionFromComponents =
  (components?: OpenAPIV3_1.ComponentsObject) =>
  (section: keyof OpenAPIV3_1.ComponentsObject): NamedSchema[] =>
    Object.entries(components?.[section] ?? {})
      .map(([name, schema]) => namedSchemaFromOpenAPIObject({ name, schema }))
      .filter(isDefined)

/**
 * Parses NamedSchemas from all shared component schemas
 */
export const schemasForComponents = ({ components }: OpenAPIV3_1.Document): NamedSchema[] =>
  flatten((['schemas', 'responses', 'requestBodies'] as const).map(schemasForSectionFromComponents(components))).filter(
    isDefined,
  )

/**
 * Helper function to convert OpenAPI schema to NamedSchema
 *
 * @param schema OpenAPI schema to convert to JSON schema
 * @returns JSON schema with the title property stripped
 */
export const toNamedSchema = (
  name: string,
  schema: OpenAPIV3_1.BaseSchemaObject | undefined,
): NamedSchema | undefined => {
  if (!schema) return

  const definition = schema as JSONSchema

  // Removes title to reduce naming conflicts due to generators
  // giving "title" precedence over the definition name
  if (definition.title) delete definition.title

  return {
    name,
    definition,
  }
}

export const isRef = <T>(value: T): value is T & OpenAPIV3_1.ReferenceObject => '$ref' in value
export const isResponseOrRequestBody = <
  T extends
    | OpenAPIV3_1.SchemaObject
    | OpenAPIV3_1.RequestBodyObject
    | OpenAPIV3_1.ResponseObject
    | OpenAPIV3_1.ReferenceObject,
>(
  value: T,
): value is T & (OpenAPIV3_1.ResponseObject | OpenAPIV3_1.RequestBodyObject) => 'content' in value

export const jsonContentSchema = (
  contentSchema: OpenAPIV3_1.ResponseObject | OpenAPIV3_1.RequestBodyObject,
): OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject | undefined =>
  contentSchema.content?.['application/json']?.schema // TODO: add support for other content types

/**
 * Attempts to parse a JSON schema from an OpenAPISchema
 * and gives it a name for future code-generation
 *
 * @param name Name to give the schema
 * @param object Schema object with multiple overloaded shapes
 * @returns Returns a NamedSchema object if it could find a valid OpenAPI schema
 */
export const namedSchemaFromOpenAPIObject = ({
  name,
  schema,
}: {
  name: string
  schema?:
    | OpenAPIV3_1.SchemaObject
    | OpenAPIV3_1.RequestBodyObject
    | OpenAPIV3_1.ResponseObject
    | OpenAPIV3_1.ReferenceObject
}): NamedSchema | undefined => {
  if (!schema) return
  if (isRef(schema)) return { name, definition: { $ref: schema.$ref } }

  if (isResponseOrRequestBody(schema)) {
    return toNamedSchema(name, jsonContentSchema(schema))
  }

  return toNamedSchema(name, schema)
}

/**
 * OpenAPI schemas use #/components/ while JSON schemas
 * use #/definitions/ to store related sub-schemas
 */
export const translateSchemaRefs = <T>(schema: T): T => {
  const stringified = JSON.stringify(schema)

  const translated = stringified.replace(/#\/components\/([^/]+\/)/g, '#/definitions/')
  return JSON.parse(translated)
}
