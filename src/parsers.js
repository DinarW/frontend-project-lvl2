import yaml from 'js-yaml';

const parsers = {
  yml: yaml.load,
  yaml: yaml.load,
  json: JSON.parse,
};

const parse = (stringData, dataType) => {
  const parser = parsers[dataType];
  const data = parser(stringData);
  return data;
};

export default parse;
