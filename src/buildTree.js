import _ from 'lodash';

const compareObjects = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { type: 'add', key, val: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, val: data1[key] };
    }
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'recursion', key, children: compareObjects(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'updated', key, val1: value1, val2: value2,
      };
    }

    return { type: 'same', key, val: value1 };
  });
};

const buildTree = (object1, object2) => ({ type: 'root', children: compareObjects(object1, object2) });

export default buildTree;
