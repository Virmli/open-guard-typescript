import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { OpenAPIV3_1 } from 'openapi-types'
import { join } from 'path'

import { GenerateOptions, FileReader, FileWriter, ParsedSchema } from './types'
import { generateTSTypes, generateTypeGuardFile } from './utils'
import { DEFAULT_BANNER_COMMENT } from './constants'
import { parseSchema } from './parse-schema'
import { isString } from './utils'

/**
 * Reads API spec from input file path and
 * generates code to output directory
 */
export const generate = async (
    {
        inputFilePath,
        outputDirectoryPath,
        bannerComment = DEFAULT_BANNER_COMMENT,
        generateTypeGuards = true,
        writeFile = writeFileSync,
        readFile = readFileSync,
        createDirectory = (name: string): void => {
            if (!existsSync(name)) mkdirSync(name)
        },
    }: GenerateOptions): Promise<{ schema: ParsedSchema }> => {
    const outputFile = fileWriter(outputDirectoryPath, writeFile)
    createDirectory(outputDirectoryPath)

    outputFile('index.ts', generateIndexFile({ generateTypeGuards }))

    const openApiSpec = parseOpenAPIDocument(inputFilePath, readFile)
    const schema = parseSchema(openApiSpec)

    outputFile('types.ts', await generateTSTypes(schema, { bannerComment }))

    if (generateTypeGuards) {
        outputFile('schema.json', JSON.stringify(schema, null, 2))
        outputFile('guards.ts', generateTypeGuardFile(schema, { bannerComment }))
    }

    return { schema }
}

const fileWriter =
    (directory: string, writeFile: FileWriter = writeFileSync) =>
        (name: string, contents: string) =>
            writeFile(join(directory, name), contents)

export const parseOpenAPIDocument = (
    inputFilePath: string,
    readFile: FileReader = readFileSync,
): OpenAPIV3_1.Document => {
    // TODO: add support for OpenAPI in yml and other spec formats
    if (!inputFilePath.endsWith('.json')) throw new Error('Only JSON based OpenAPI specs are supported at the moment')
    const spec = JSON.parse(readFile(inputFilePath).toString())
    if (!isString(spec.openapi) || !spec.openapi.includes('3.1')) {
        // TODO: verify if this code works with V3.0 and V2.0
        throw new Error('OpenAPI spec must be version 3.1')
    }

    return spec
}

export const generateIndexFile = ({ generateTypeGuards }: { generateTypeGuards: boolean }): string =>
    `
export * from './types'
${generateTypeGuards ? "export * from './guards'" : ''}
`.trim()
