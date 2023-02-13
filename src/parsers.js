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
  if (format === '.json') {
    return JSON.parse;
  } if (format === '.yml' || format === '.yaml') {
    return yaml.load;
  }
  throw new Error(`Unknown file extension: ${format}`);
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
