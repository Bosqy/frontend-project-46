import getStylish from './stylish.js';
import getPlain from './plain.js';

const formatter = (tree, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(tree);
    case 'plain':
      return getPlain(tree);
    case 'json':
      return JSON.stringify(tree, null, '  ');
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default formatter;
