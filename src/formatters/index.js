import getStylish from './stylish.js';
import getPlain from './plain.js';

const formatter = (tree, format) => {
  if (format === 'stylish') {
    return getStylish(tree);
  }
  if (format === 'plain') {
    return getPlain(tree);
  }
  if (format === 'json') {
    return JSON.stringify(tree, null, '  ');
  }
  throw new Error(`Unknown format: ${format}`);
};

export default formatter;
