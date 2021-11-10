import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getExpected = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('JSON Diff', () => {
  const file1Path = getFixturePath('file_flat1.json');
  const file2Path = getFixturePath('file_flat2.json');
  const expectedFile = getExpected('expected.flat.txt');
  expect(genDiff(file1Path, file2Path)).toEqual(expectedFile);
});

test('YAML Diff', () => {
  const file1Path = getFixturePath('file_flat1.yml');
  const file2Path = getFixturePath('file_flat2.yml');
  const expectedFile = getExpected('expected.flat.txt');
  expect(genDiff(file1Path, file2Path)).toEqual(expectedFile);
});

test('Recursive comparison', () => {
  const file1Path = getFixturePath('file_nested1.json');
  const file2Path = getFixturePath('file_nested2.json');
  const expectedFile = getExpected('expected.nested.txt');
  expect(genDiff(file1Path, file2Path)).toEqual(expectedFile);
});
