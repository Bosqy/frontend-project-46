#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

const command = (filepath1, filepath2, format) => {
  const output = genDiff(filepath1, filepath2, format);
  console.log(output);
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <format>', 'output format', 'stylish')
  .parse(process.argv);

const { args } = program;
const [filepath1, filepath2] = args;
const options = program.opts();
const { format } = options;

command(filepath1, filepath2, format);
