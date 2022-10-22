#!/usr/bin/env node
import yargs from 'yargs'
import { generate } from './generator'

const args = yargs(process.argv)
    .option('input', {
        alias: 'i',
        type: 'string',
        demandOption: true,
        description: 'Input file path to generate from',
    })
    .option('output', {
        alias: 'o',
        type: 'string',
        demandOption: true,
        description: 'Output file directory to generate to',
    })
    .parseSync()

console.log(`\nCreating type guards`)
console.log(` Input: ${args.input}`)
console.log(` Output: ${args.output}`)
console.log('------------------------------------')

generate({
    inputFilePath: args.input,
    outputDirectoryPath: args.output,
    generateTypeGuards: !args.skipTypeGuards,
})
    .then(() => console.log(`✅ Successfully generated files to ${args.output}\n`))
    .catch((error: unknown) => {
        console.error(error)
        console.error(`\n❌ Failed to generate types`)
    })
