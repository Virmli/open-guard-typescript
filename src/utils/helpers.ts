import { pascalCase, pascalCaseTransformMerge } from 'pascal-case'

export const isString = (value: unknown): value is string => typeof value === 'string'
export const isDefined = <T>(value: T | undefined): value is T => value !== undefined

export const toPascalCase = (value: string) => pascalCase(value, { transform: pascalCaseTransformMerge })

export const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value))

export const flatten = <T>(array: T[][]): T[] =>
    array.reduce<T[]>((state, subArray) => {
        subArray.forEach((item) => state.push(item))
        return state
    }, [])
