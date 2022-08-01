#!/usr/bin/env node
import yargs from 'yargs'

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
