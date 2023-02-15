import yaml from 'js-yaml';

const getParser = (extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse;
    case '.yml':
    case '.yaml':
      return yaml.load;
    default:
      throw new Error(`Unknown file extension: ${extension}`);
  }
};

const parseFile = ([file, extension]) => {
  const parser = getParser(extension);
  return parser(file);
};

export default parseFile;
