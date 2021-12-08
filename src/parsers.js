import yaml from 'js-yaml';

const extnames = {
  yml: yaml.load,
  yaml: yaml.load,
  json: JSON.parse,
};

const parse = (data, dataType) => {
  const extname = extnames[dataType];
  const fileData = extname(data);
  return fileData;
};

export default parse;
