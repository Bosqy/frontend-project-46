import path from 'path';
import { readFileSync } from 'node:fs';
import process from 'node:process';
import yaml from 'js-yaml';

const getPath = (file) => {
  const pwd = process.cwd();
  return path.resolve(pwd, file);
};

const getParser = (file) => {
  const format = path.extname(file);
  let parser = '';
  if (format === '.json') {
    parser = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parser = yaml.load;
  }
  return parser;
};

const parseFile = (file) => {
  const parser = getParser(file);
  if (parser === '') {
    return {};
  }
  const fileContent = readFileSync(getPath(file), 'utf8');
  return parser(fileContent);
};

export default parseFile;
