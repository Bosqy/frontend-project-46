import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedFile1File2 = readFileSync(getFixturePath('expected_file1_file2'), 'utf8').trim();
const expectedFile2File1 = readFileSync(getFixturePath('expected_file2_file1'), 'utf8').trim();

test('genDiff JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(genDiff(file1, file2)).toEqual(expectedFile1File2);

  expect(genDiff(file2, file1)).toEqual(expectedFile2File1);
});

test('genDiff YAML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yaml');

  expect(genDiff(file1, file2)).toEqual(expectedFile1File2);

  expect(genDiff(file2, file1)).toEqual(expectedFile2File1);
});
