import _ from 'lodash';

const getIndent = (depth) => {
  const replacer = '  ';
  return depth > 0 ? `${replacer.repeat(depth)}` : '';
};

const stringify = (value, depth) => {
  if (_.isPlainObject(value)) {
    const indent = getIndent(depth * 2 + 2);
    const entries = Object.entries(value)
      .map(([entryKey, entryValue]) => `${indent}${entryKey}: ${stringify(entryValue, depth + 1)}`);
    const closingBrace = `${getIndent(depth * 2)}}`;
    return ['{', ...entries, closingBrace].join('\n');
  }
  return value;
};

const getStylish = (tree) => {
  const iter = (innerTree, depth) => {
    const content = innerTree.map((el) => {
      const indent = `${getIndent(depth * 2 - 1)}`;
      const value = stringify(el.value, depth);
      const oldValue = stringify(el.oldValue, depth);
      switch (el.status) {
        case 'tree':
          return `${indent}  ${el.key}: ${iter(el.children, depth + 1)}`;
        case 'updated':
          return `${indent}- ${el.key}: ${oldValue}\n${indent}+ ${el.key}: ${value}`;
        case 'unchanged':
          return `${indent}  ${el.key}: ${value}`;
        case 'added':
          return `${indent}+ ${el.key}: ${value}`;
        case 'removed':
          return `${indent}- ${el.key}: ${value}`;
        default:
          throw new Error(`Unknown status: ${el.status}`);
      }
    });
    const closingBrace = `${getIndent(2 * depth - 2)}}`;
    return ['{', ...content, closingBrace].join('\n');
  };
  return iter(tree, 1);
};

export default getStylish;
