import _ from 'lodash';

const getIndent = (depth) => {
  const indentPerDepth = 4;
  return ' '.repeat(depth * indentPerDepth).slice(0, -2);
};

const stringify = (value, depth) => {
  const indent = getIndent(depth);
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }
  const entries = Object.entries(value)
    .map(([entryKey, entryValue]) => `${indent}  ${entryKey}: ${stringify(entryValue, depth + 1)}`);
  const closingBrace = `${getIndent(depth - 1)}  }`;
  return ['{', ...entries, closingBrace].join('\n');
};

const getStylish = (tree) => {
  const iter = (innerTree, depth) => {
    const content = innerTree.map((el) => {
      const indent = getIndent(depth);
      switch (el.status) {
        case 'nested':
          return `${indent}  ${el.key}: ${iter(el.children, depth + 1)}`;
        case 'changed':
          return `${indent}- ${el.key}: ${stringify(el.oldValue, depth + 1)}\n${indent}+ ${el.key}: ${stringify(el.value, depth + 1)}`;
        case 'unchanged':
          return `${indent}  ${el.key}: ${stringify(el.value, depth + 1)}`;
        case 'added':
          return `${indent}+ ${el.key}: ${stringify(el.value, depth + 1)}`;
        case 'deleted':
          return `${indent}- ${el.key}: ${stringify(el.value, depth + 1)}`;
        default:
          throw new Error(`Unknown status: ${el.status}`);
      }
    });
    const closingBrace = depth === 1 ? '}' : `${getIndent(depth - 1)}  }`;
    return ['{', ...content, closingBrace].join('\n');
  };
  return iter(tree, 1);
};

export default getStylish;
