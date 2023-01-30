#!/usr/bin/env node

import { program } from 'commander';

const command = () => {
  console.log('It Works!');
}

program
  .version('0.0.1')
  .action(command)
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format', 'output format')
  .parse(process.argv);

