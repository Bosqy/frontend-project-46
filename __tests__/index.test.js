import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylish = readFileSync(getFixturePath('expected_stylish'), 'utf8').trim();

test('genDiff JSON formatter: default', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2)).toEqual(expectedStylish);
});

test('genDiff YAML formatter: default', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yaml');
  expect(genDiff(file1, file2)).toEqual(expectedStylish);
});

test('genDiff JSON formatter: stylish', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
});

const expectedStylishReverse = readFileSync(getFixturePath('expected_stylish_reverse'), 'utf8').trim();

test('genDiff JSON reverse arguments formatter: stylish', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file2, file1, 'stylish')).toEqual(expectedStylishReverse);
});

test('genDiff YAML formatter: stylish', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yaml');
  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
});

const expectedPlain = readFileSync(getFixturePath('expected_plain'), 'utf8').trim();

test('genDiff JSON formatter: plain', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
});

test('genDiff YAML formatter: plain', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yaml');
  expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
});

const expectedJSON = readFileSync(getFixturePath('expected_json'), 'utf8').trim();

test('genDiff JSON formatter: json', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2, 'json')).toEqual(expectedJSON);
});

test('genDiff YAML formatter: json', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yaml');
  expect(genDiff(file1, file2, 'json')).toEqual(expectedJSON);
});
