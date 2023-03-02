import _ from 'lodash';

const getIndent = (depth, label = 'blank') => {
  const indentPerDepth = 4;
  const spaces = ' '.repeat(depth * indentPerDepth);

  switch (label) {
    case 'plus':
      return `${spaces.slice(0, -2)}+ `;
    case 'minus':
      return `${spaces.slice(0, -2)}- `;
    default:
      return spaces;
  }
};

const stringify = (value, depth) => {
  const indent = getIndent(depth);
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }
  const entries = Object.entries(value)
    .map(([entryKey, entryValue]) => `${indent}${entryKey}: ${stringify(entryValue, depth + 1)}`);
  const closingBrace = `${getIndent(depth - 1)}}`;
  return ['{', ...entries, closingBrace].join('\n');
};

const getStylish = (tree) => {
  const iter = (innerTree, depth) => {
    const content = innerTree.map((el) => {
      switch (el.status) {
        case 'nested':
          return `${getIndent(depth)}${el.key}: ${iter(el.children, depth + 1)}`;
        case 'changed':
          return `${getIndent(depth, 'minus')}${el.key}: ${stringify(el.oldValue, depth + 1)}\n${getIndent(depth, 'plus')}${el.key}: ${stringify(el.value, depth + 1)}`;
        case 'unchanged':
          return `${getIndent(depth)}${el.key}: ${stringify(el.value, depth + 1)}`;
        case 'added':
          return `${getIndent(depth, 'plus')}${el.key}: ${stringify(el.value, depth + 1)}`;
        case 'deleted':
          return `${getIndent(depth, 'minus')}${el.key}: ${stringify(el.value, depth + 1)}`;
        default:
          throw new Error(`Unknown status: ${el.status}`);
      }
    });
    const closingBrace = depth === 1 ? '}' : `${getIndent(depth - 1)}}`;
    return ['{', ...content, closingBrace].join('\n');
  };
  return iter(tree, 1);
};

export default getStylish;
