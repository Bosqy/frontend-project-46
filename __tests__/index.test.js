import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const yamlFile1 = getFixturePath('file1.yml');
const yamlFile2 = getFixturePath('file2.yaml');
const txtFile1 = getFixturePath('file1.txt');
const txtFile2 = getFixturePath('file2.txt');

const expectedStylish = readFileSync(getFixturePath('expected_stylish'), 'utf8').trim();
const expectedPlain = readFileSync(getFixturePath('expected_plain'), 'utf8').trim();
const expectedJSON = readFileSync(getFixturePath('expected_json'), 'utf8').trim();

describe('Normal work', () => {
  test.each([
    { formatter: 'stylish', expected: expectedStylish },
    { formatter: 'plain', expected: expectedPlain },
    { formatter: 'json', expected: expectedJSON },
  ])('genDiff JSON formatter: $formatter', ({ formatter, expected }) => {
    expect(genDiff(jsonFile1, jsonFile2, formatter)).toEqual(expected);
  });

  test('genDiff YAML formatter: default', () => {
    expect(genDiff(yamlFile1, yamlFile2)).toEqual(expectedStylish);
  });
});

describe('Errors', () => {
  test('genDiff error: Unknown file format', () => {
    expect(() => {
      genDiff(txtFile1, txtFile2, 'stylish');
    }).toThrow('Unknown file format');
  });

  test('genDiff error: Unknown formatter', () => {
    expect(() => {
      genDiff(jsonFile1, jsonFile2, 'foo');
    }).toThrow('Unknown formatter');
  });
});
