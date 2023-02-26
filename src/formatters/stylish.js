import _ from 'lodash';

const getIndent = (depth) => {
  const replacer = '  ';
  return depth === 0 ? '' : `${replacer.repeat(depth * 2 - 1)}`;
};

const stringify = (value, depth) => {
  const indent = getIndent(depth);
  if (_.isPlainObject(value)) {
    const entries = Object.entries(value)
      .map(([entryKey, entryValue]) => `${indent}  ${entryKey}: ${stringify(entryValue, depth + 1)}`);
    const closingBrace = `  ${getIndent(depth - 1)}}`;
    return ['{', ...entries, closingBrace].join('\n');
  }
  return `${value}`;
};

const getStylish = (tree) => {
  const iter = (innerTree, depth) => {
    const content = innerTree.map((el) => {
      const indent = `${getIndent(depth)}`;
      switch (el.status) {
        case 'tree':
          return `${indent}  ${el.key}: ${iter(el.children, depth + 1)}`;
        case 'updated':
          return `${indent}- ${el.key}: ${stringify(el.oldValue, depth + 1)}\n${indent}+ ${el.key}: ${stringify(el.value, depth + 1)}`;
        case 'unchanged':
          return `${indent}  ${el.key}: ${stringify(el.value, depth + 1)}`;
        case 'added':
          return `${indent}+ ${el.key}: ${stringify(el.value, depth + 1)}`;
        case 'removed':
          return `${indent}- ${el.key}: ${stringify(el.value, depth + 1)}`;
        default:
          throw new Error(`Unknown status: ${el.status}`);
      }
    });
    const closingBrace = depth === 1 ? '}' : `  ${getIndent(depth - 1)}}`;
    return ['{', ...content, closingBrace].join('\n');
  };
  return iter(tree, 1);
};

export default getStylish;
