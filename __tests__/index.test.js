import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import genDiff from '../src/index.js';
import formatter from '../src/formatters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedFile1File2 = readFileSync(getFixturePath('expected_file1_file2'), 'utf8').trim();

test('genDiff JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const diffTree = genDiff(file1, file2);
  expect(formatter(diffTree)).toEqual(expectedFile1File2);
});

test('genDiff YAML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yaml');
  const diffTree = genDiff(file1, file2);
  expect(formatter(diffTree)).toEqual(expectedFile1File2);
});
