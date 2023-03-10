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

const getPlainStatus = (status) => {
  switch (status) {
    case 'deleted':
      return 'removed';
    case 'changed':
      return 'updated';
    default:
      return status;
  }
};

const getPlainString = (property, status) => {
  const plainStatus = getPlainStatus(status);
  return `Property '${property}' was ${plainStatus}`;
};

const getPlain = (tree) => {
  const iter = (innerTree, path) => innerTree
    .flatMap((el) => {
      const property = path === '' ? el.key : path.concat('.', el.key);
      switch (el.status) {
        case 'nested':
          return [...iter(el.children, property)];
        case 'changed':
          return `${getPlainString(property, el.status)}. From ${stringify(el.oldValue)} to ${stringify(el.value)}`;
        case 'unchanged':
          return [];
        case 'added':
          return `${getPlainString(property, el.status)} with value: ${stringify(el.value)}`;
        case 'deleted':
          return `${getPlainString(property, el.status)}`;
        default:
          throw new Error(`Unknown status: ${el.status}`);
      }
    });
  return iter(tree, '').join('\n');
};

export default getPlain;
