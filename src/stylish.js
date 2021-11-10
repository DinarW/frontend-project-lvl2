const numberOfSpaces = (number) => ' '.repeat(number + 4);

const stringify = (currentValue, spaceCount) => {
  const iter = (current, spaces) => {
    if (typeof current !== 'object') {
      return `${current}`;
    }
    if (current === null) return null;

    const lines = Object.entries(current)
      .map(([key, value]) => `${numberOfSpaces(spaces + 4)}${key}: ${iter(value, spaces + 4)}`);

    return ['{', ...lines, `${numberOfSpaces(spaces)}}`].join('\n');
  };

  return iter(currentValue, spaceCount);
};

const stylish = (data) => {
  const iter = (tree, spaces) => tree.map((node) => {
    const typeOfNode = node.type;
    if ((typeOfNode === '+') || (typeOfNode === '-') || (typeOfNode === ' ')) {
      return `${numberOfSpaces(spaces - 2)}${typeOfNode} ${node.key}: ${stringify(node.val, spaces)}\n`;
    }

    if (typeOfNode === '-+') {
      return `${numberOfSpaces(spaces - 2)}- ${node.key}: ${stringify(node.val1, spaces)}\n${numberOfSpaces(spaces - 2)}+ ${node.key}: ${stringify(node.val2, spaces)}\n`;
    }

    return `${numberOfSpaces(spaces)}${node.key}: {\n${iter(node.children, spaces + 4).join('')}${numberOfSpaces(spaces)}}\n`;
  });

  return `{\n${iter(data, 0).join('')}}`;
};

export default stylish;
