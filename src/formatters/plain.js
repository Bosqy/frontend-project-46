import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof (value) !== 'string') {
    return `${value}`;
  }
  return `'${value}'`;
};

const getPlain = (tree) => {
  const iter = (innerTree, path) => innerTree
    .flatMap((el) => {
      const property = path === '' ? el.key : path.concat('.', el.key);
      switch (el.status) {
        case 'tree':
          return [...iter(el.children, property)];
        case 'updated':
          return `Property '${property}' was updated. From ${stringify(el.oldValue)} to ${stringify(el.value)}`;
        case 'unchanged':
          return [];
        case 'added':
          return `Property '${property}' was added with value: ${stringify(el.value)}`;
        case 'removed':
          return `Property '${property}' was removed`;
        default:
          throw new Error(`Unknown status: ${el.status}`);
      }
    });
  return iter(tree, '').join('\n');
};

export default getPlain;
