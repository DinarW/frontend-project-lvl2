import getFileData from './parsers.js';
import format from './formatters/index.js';
import buildTree from './buildTree.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const object1 = getFileData(filepath1);
  const object2 = getFileData(filepath2);
  return format(buildTree(object1, object2), formatName);
};

export default genDiff;
