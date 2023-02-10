import parseFile from './parsers.js';
import genDiffTree from './tree.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const [file1, file2] = [filepath1, filepath2]
    .map(parseFile);
  const diffTree = genDiffTree(file1, file2);
  return formatter(diffTree, formatName);
};

export default genDiff;
