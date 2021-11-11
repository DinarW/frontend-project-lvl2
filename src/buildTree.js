import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.sortedUniq(_.sortBy(Object.keys({ ...data1, ...data2 })));

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { type: 'add', key, val: value2 };
    }
    if (!_.has(data2, key)) {
      return { type: 'remove', key, val: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'recursion', key, children: buildTree(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'updated', key, val1: value1, val2: value2,
      };
    }

    return { type: 'same', key, val: value1 };
  });
};

export default buildTree;
