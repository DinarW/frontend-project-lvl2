import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getFileData = (filepath) => {
  const absoluteFilePath = path.isAbsolute(filepath) ? file : path.resolve(process.cwd(), filepath);
  const fileData = JSON.parse(fs.readFileSync(absoluteFilePath, 'utf-8'));
  return fileData;
};

const compareObjects = (object1, object2) => {
  const keys = _.sortedUniq([...Object.keys(object1), ...Object.keys(object2)].sort());
  const diff = keys
    .reduce((acc, key) => {
      if (_.has(object1, key) && !_.has(object2, key)) {
        acc.push(` - ${key}: ${object1[key]}`);
        return acc;
      }

      if (!_.has(object1, key) && _.has(object2, key)) {
        acc.push(` + ${key}: ${object2[key]}`);
        return acc;
      }

      if (object1[key] === object2[key]) {
        acc.push(`   ${key}: ${object1[key]}`);
        return acc;
      }

      acc.push(` - ${key}: ${object1[key]}`);
      acc.push(` + ${key}: ${object2[key]}`);

      return acc;
    }, []).join('\n');
  const result =  `{\n${diff}\n}`;
  return result;
};

const genDiff = (filepath1, filepath2) => {
  const object1 = getFileData(filepath1);
  const object2 = getFileData(filepath2);
  return compareObjects(object1, object2);
};

export default genDiff;