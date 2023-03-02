import getStylish from './stylish.js';
import getPlain from './plain.js';

const format = (tree, formatter) => {
  switch (formatter) {
    case 'stylish':
      return getStylish(tree);
    case 'plain':
      return getPlain(tree);
    case 'json':
      return JSON.stringify(tree, null, '  ');
    default:
      throw new Error(`Unknown formatter: ${formatter}`);
  }
};

export default format;
