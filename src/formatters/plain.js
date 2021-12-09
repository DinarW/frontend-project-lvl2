import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (_.isString(data)) {
    return `'${data}'`;
  }
  return String(data);
};

const plain = (data, pathKeys = []) => {
  const fieldKeys = [...pathKeys, data.key];
  const fieldName = fieldKeys.join('.');
  switch (data.type) {
    case 'root': {
      const output = _.compact(data.children.flatMap((node) => plain(node)));
      return output.join('\n');
    }
    case 'recursion': {
      const output = _.compact(data.children.flatMap((node) => plain(node, fieldKeys)));
      return output.join('\n');
    }
    case 'add':
      return `Property '${fieldName}' was added with value: ${stringify(data.val)}`;
    case 'removed':
      return `Property '${fieldName}' was removed`;
    case 'updated': {
      const { val1, val2 } = data;
      return `Property '${fieldName}' was updated. From ${stringify(val1)} to ${stringify(val2)}`;
    }
    default:
      if (data.type === 'same') {
        return null;
      }
      throw new Error('Error! Unknown type!');
  }
};

export default plain;
