import getStylish from './stylish.js';
import getPlain from './plain.js';

const formatter = (tree, format = 'stylish') => {
  if (format === 'stylish') {
    return getStylish(tree);
  }
  if (format === 'plain') {
    return getPlain(tree);
  }
  throw new Error(`Unknown format: ${format}`);
};

export default formatter;
