import _ from 'lodash';

const getIndent = (depth, label = 'blank') => {
  const spaces = ' '.repeat(depth * 4);
  switch (label) {
    case 'blank':
      return spaces;
    case 'plus':
      return `${spaces.slice(0, -2)}+ `;
    case 'minus':
      return `${spaces.slice(0, -2)}- `;
    default:
      throw new Error(`Unknown label: ${label}`);
  }
};

const stringify = (value, depth) => {
  const indent = getIndent(depth);
  if (_.isPlainObject(value)) {
    const entries = Object.entries(value)
      .map(([entryKey, entryValue]) => `${indent}${entryKey}: ${stringify(entryValue, depth + 1)}`);
    const closingBrace = `${getIndent(depth - 1)}}`;
    return ['{', ...entries, closingBrace].join('\n');
  }
  return `${value}`;
};

const getStylish = (tree) => {
  const iter = (innerTree, depth) => {
    const content = innerTree.map((el) => {
      switch (el.status) {
        case 'tree':
          return `${getIndent(depth)}${el.key}: ${iter(el.children, depth + 1)}`;
        case 'updated':
          return `${getIndent(depth, 'minus')}${el.key}: ${stringify(el.oldValue, depth + 1)}\n${getIndent(depth, 'plus')}${el.key}: ${stringify(el.value, depth + 1)}`;
        case 'unchanged':
          return `${getIndent(depth)}${el.key}: ${stringify(el.value, depth + 1)}`;
        case 'added':
          return `${getIndent(depth, 'plus')}${el.key}: ${stringify(el.value, depth + 1)}`;
        case 'removed':
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
