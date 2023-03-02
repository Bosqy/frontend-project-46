import path from 'path';
import process from 'node:process';
import { readFileSync } from 'node:fs';
import parseFile from './parsers.js';
import genDiffTree from './tree.js';
import format from './formatters/index.js';

const getPath = (file) => {
  const pwd = process.cwd();
  return path.resolve(pwd, file);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const [file1, file2] = [filepath1, filepath2]
    .map(getPath)
    .map((filepath) => [readFileSync(filepath, 'utf8'), path.extname(filepath)])
    .map(parseFile);
  const diffTree = genDiffTree(file1, file2);
  return format(diffTree, formatName);
};

export default genDiff;
