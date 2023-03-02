import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylish = readFileSync(getFixturePath('expected_stylish'), 'utf8').trim();
const expectedPlain = readFileSync(getFixturePath('expected_plain'), 'utf8').trim();
const expectedJSON = readFileSync(getFixturePath('expected_json'), 'utf8').trim();

test.each([
  { formatter: 'stylish', expected: expectedStylish },
  { formatter: 'plain', expected: expectedPlain },
  { formatter: 'json', expected: expectedJSON },
])('genDiff JSON formatter: $formatter', ({ formatter, expected }) => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2, formatter)).toEqual(expected);
});

test('genDiff formatter: default', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2)).toEqual(expectedStylish);
});

test('genDiff YAML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yaml');
  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
});

test('genDiff error: Unknown file extension', () => {
  const file1 = getFixturePath('file1.txt');
  const file2 = getFixturePath('file2.txt');
  expect(() => {
    genDiff(file1, file2, 'stylish');
  }).toThrow('Unknown file extension');
});

test('genDiff error: Unknown file extension', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(() => {
    genDiff(file1, file2, 'foo');
  }).toThrow('Unknown formatter');
});
