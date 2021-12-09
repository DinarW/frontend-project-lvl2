#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/genDiff.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, { format }) => console.log(genDiff(filepath1, filepath2, format)))
  .parse();
