#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <format>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const output = genDiff(filepath1, filepath2, options.format);
    console.log(output);
  })
  .parse(process.argv);
