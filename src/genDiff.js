import _ from 'lodash';
import getFileData from './parsers.js';
import stylish from './stylish.js';

const buildTree = (data1, data2) => {
  const keys = _.sortedUniq(Object.keys({ ...data1, ...data2 }).sort());
  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { type: '+', key, val: value2 };
    }
    if (!_.has(data2, key)) {
      return { type: '-', key, val: value1 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { type: 'recursion', key, children: buildTree(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: '-+', key, val1: value1, val2: value2,
      };
    }

    return { type: ' ', key, val: value1 };
  });
};

const genDiff = (filepath1, filepath2) => {
  const object1 = getFileData(filepath1);
  const object2 = getFileData(filepath2);
  return stylish(buildTree(object1, object2));
};

export default genDiff;
