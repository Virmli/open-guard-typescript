import { DEFAULT_BANNER_COMMENT, SCHEMA_TYPE_NAME } from '../constants'
import { ParsedSchema } from '../types'
import { toPascalCase } from '../utils'

export type GenerateAJVOptions = {
  bannerComment?: string
  formats?: string[]
}

/**
 * Generate AJV type guards that can validate
 * the definitions in the parsed schema
 */
export const generateTypeGuardFile = (
  schema: ParsedSchema,
  {
    bannerComment = DEFAULT_BANNER_COMMENT,
    formats = ['email', 'uuid', 'date', 'date-time', 'uri'],
  }: GenerateAJVOptions = {},
): string =>
  `
  ${bannerComment}

  import Ajv, { ValidateFunction, AsyncValidateFunction } from 'ajv'
  import addFormats from 'ajv-formats'

  import { ${SCHEMA_TYPE_NAME} } from './types'
  import jsonSchema from './schema.json'

  const ajv = new Ajv({ strict: false })
  addFormats(ajv, { formats: ${JSON.stringify(formats)} })

  ajv.compile(jsonSchema)

  /**
   * When loading a schema the type guard may be async or undefined
   * if the schema requires external resolution or could not be found
   *
   * We have chosen to not support this in this version of code generation
   * to make the contract simpler for consumers
   */
  const assertValidateFunction = <T>(
    guard: ValidateFunction<T> | AsyncValidateFunction<T> | undefined,
  ): ValidateFunction<T> => {
    if (!guard) throw new Error('Could not resolve schema for AJV')
    if ('$async' in guard) throw new Error('Can not support async AJV type guards')
    return guard
  }

  ${generateAllTypeGuards(schema)}
  `

export const generateTypeGuard = (name: string): string =>
  `export const is${toPascalCase(
    name,
  )} = assertValidateFunction(ajv.getSchema<${SCHEMA_TYPE_NAME}['${name}']>('#/definitions/${name}'))`

/**
 * Generate type guard code for each definition within the schema
 */
export const generateAllTypeGuards = (schema: ParsedSchema): string =>
  Object.keys(schema.definitions).map(generateTypeGuard).join('\n')
