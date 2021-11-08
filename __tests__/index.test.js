import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getExpected = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Diff', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const expectedFile = getExpected('expected.diff.txt');
  expect(genDiff(file1Path, file2Path)).toEqual(expectedFile);
});