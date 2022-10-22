import { JSONSchema } from 'json-schema-to-typescript'

export type FileWriter = (path: string, contents: string) => void
export type FileReader = (path: string) => string | Buffer
export type DirectoryCreator = (path: string) => void

export type GenerateOptions = {
    /**
     * File path leading to OpenAPI spec
     */
    inputFilePath: string
    /**
     * Directory to output generated files to
     */
    outputDirectoryPath: string
    /**
     * Comment to display at the top of generated files
     */
    bannerComment?: string
    /**
     * Will generate type guards for types.
     * This option allows you to disable that.
     *
     * @default true
     */
    generateTypeGuards?: boolean
    /**
     * Function used to output files
     * Will default to fs.writeFileSync
     *
     * @default fs.writeFileSync
     */
    writeFile?: FileWriter
    /**
     * Function used to read files
     * Will default to fs.readFileSync
     *
     * @default fs.writeFileSync
     */
    readFile?: FileReader
    /**
     * Function used to read files
     *
     * Will default to checking if directory exists
     * and creating it if it doesn't using fs.mkdirSync
     *
     * @default fs.writeFileSync
     */
    createDirectory?: DirectoryCreator
}

export type ParsedSchema = {
    type: 'object'
    title: 'Schema'
    definitions: Record<string, JSONSchema>
    properties: Record<string, JSONSchema>
    required: string[]
}

export type NamedSchema = {
    name: string
    definition: JSONSchema
}
