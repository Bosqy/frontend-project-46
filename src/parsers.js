import yaml from 'js-yaml';

const getParser = (format) => {
  switch (format) {
    case 'json':
      return JSON.parse;
    case 'yml':
    case 'yaml':
      return yaml.load;
    default:
      throw new Error(`Unknown file format: ${format}`);
  }
};

const parseFile = ([data, format]) => {
  const parser = getParser(format);
  return parser(data);
};

export default parseFile;
