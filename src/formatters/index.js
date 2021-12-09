import stylish from './stylish.js';
import plain from './plain.js';

const formats = {
  stylish,
  plain,
  json: (field) => JSON.stringify(field.children),
};

export default (getDiff, format) => formats[format](getDiff);
