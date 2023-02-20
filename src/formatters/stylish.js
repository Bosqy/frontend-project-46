import _ from 'lodash';
import genDiffTree from '../tree.js';

const getStylishLabel = (status) => {
  switch (status) {
    case 'updated':
      return '+-';
    case 'unchanged':
    case 'tree':
      return '  ';
    case 'added':
      return '+ ';
    case 'removed':
      return '- ';
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};

const getStylish = (tree) => {
  const replacer = '  ';
  const iter = (innerTree, depth) => {
    const content = innerTree.map((el) => {
      const stylishLabel = getStylishLabel(el.status);
      const indent = `${replacer.repeat(depth * 2 - 1)}${stylishLabel}`;
      if (el.status === 'updated') {
        const indentRemoved = indent.slice(0, -2).concat(getStylishLabel('removed'));
        const indentAdded = indent.slice(0, -2).concat(getStylishLabel('added'));
        const value = _.isPlainObject(el.value)
          ? iter(genDiffTree(el.value, el.value), depth + 1)
          : el.value;
        const oldValue = _.isPlainObject(el.oldValue)
          ? iter(genDiffTree(el.oldValue, el.oldValue), depth + 1)
          : el.oldValue;
        return `${indentRemoved}${el.key}: ${oldValue}\n${indentAdded}${el.key}: ${value}`;
      }
      if (_.has(el, 'children')) {
        return `${indent}${el.key}: ${iter(el.children, depth + 1)}`;
      }
      return _.isPlainObject(el.value)
        ? `${indent}${el.key}: ${iter(genDiffTree(el.value, el.value), depth + 1)}`
        : `${indent}${el.key}: ${el.value}`;
    });
    const closingBrace = `${replacer.repeat(depth * 2 - 2)}}`;
    return ['{', ...content, closingBrace].join('\n');
  };
  return iter(tree, 1);
};

export default getStylish;
