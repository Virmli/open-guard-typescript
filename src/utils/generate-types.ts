import { compile, Options } from 'json-schema-to-typescript'
import { SCHEMA_TYPE_NAME } from '../constants'
import { ParsedSchema } from '../types'
import { clone } from '../utils'

export type GenerateTSTypeOptions = Partial<Options>

/**
 * Generate TS file contents for all TS types
 */
export const generateTSTypes = async (schema: ParsedSchema, options: GenerateTSTypeOptions = {}): Promise<string> =>
  compile(clone(schema), SCHEMA_TYPE_NAME, options)
