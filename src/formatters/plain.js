import _ from 'lodash';

const formatType = (data) => {
  if (_.isPlainObject(data)) return '[complex value]';
  if (typeof (data) !== 'string') {
    return data;
  }
  return `'${data}'`;
};

const getDetails = (el) => {
  switch (el.status) {
    case 'updated':
      return `. From ${formatType(el.oldValue)} to ${formatType(el.value)}`;
    case 'unchanged':
      return `. Value is still: ${formatType(el.value)}`;
    case 'added':
      return ` with value: ${formatType(el.value)}`;
    case 'removed':
    case 'tree':
      return '';
    default:
      throw new Error(`Unknown status: ${el.status}`);
  }
};

const getPlain = (tree) => {
  const iter = (innerTree, path) => innerTree
    .flatMap((el) => {
      const property = path === '' ? el.key : path.concat('.', el.key);
      const elInfo = `Property ${formatType(property)} was ${el.status}${getDetails(el)}`;
      if (el.status === 'tree') {
        return [...iter(el.children, property)];
      }
      return el.status === 'unchanged' ? [] : elInfo;
    });
  return iter(tree, '').join('\n');
};

export default getPlain;
