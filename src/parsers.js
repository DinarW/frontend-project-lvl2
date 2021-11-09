import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const extnames = {
  '.yml': yaml.load,
  '.yaml': yaml.load,
  '.json': JSON.parse,
};

const getFileData = (filepath) => {
  const absolutePath = path.isAbsolute(filepath) ? filepath : path.resolve(process.cwd(), filepath);
  const extname = extnames[path.extname(absolutePath)];
  const file = fs.readFileSync(absolutePath, 'utf-8');
  const fileData = extname(file);
  return fileData;
};

export default getFileData;
