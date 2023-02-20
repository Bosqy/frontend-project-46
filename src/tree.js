import _ from 'lodash';

const genDiffTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unsortedKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unsortedKeys);
  return sortedKeys
    .map((key) => {
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return { key, status: 'tree', children: genDiffTree(obj1[key], obj2[key]) };
      }
      if (!_.has(obj1, key)) {
        return { key, status: 'added', value: obj2[key] };
      }
      if (!_.has(obj2, key)) {
        return { key, status: 'removed', value: obj1[key] };
      }
      if (_.isEqual(obj1[key], obj2[key])) {
        return { key, status: 'unchanged', value: obj1[key] };
      }
      return {
        key, status: 'updated', value: obj2[key], oldValue: obj1[key],
      };
    });
};

export default genDiffTree;
