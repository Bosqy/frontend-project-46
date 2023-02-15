import _ from 'lodash';

const genDiffTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unsortedKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unsortedKeys);
  return sortedKeys
    .map((key) => {
      if (!_.has(obj1, key)) {
        if (_.isObject(obj2[key])) {
          return {
            key, value: genDiffTree(obj2[key], obj2[key]), status: 'added', type: 'node',
          };
        }
        return {
          key, value: obj2[key], status: 'added', type: 'leaf',
        };
      }
      if (!_.has(obj2, key)) {
        if (_.isObject(obj1[key])) {
          return {
            key, value: genDiffTree(obj1[key], obj1[key]), status: 'removed', type: 'node',
          };
        }
        return {
          key, value: obj1[key], status: 'removed', type: 'leaf',
        };
      }
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return {
          key, value: genDiffTree(obj1[key], obj2[key]), status: 'unchanged', type: 'node',
        };
      }
      if (_.isObject(obj1[key])) {
        return {
          key, value: obj2[key], status: 'updated', oldValue: genDiffTree(obj1[key], obj1[key]), type: 'leaf',
        };
      }
      if (_.isObject(obj2[key])) {
        return {
          key, value: genDiffTree(obj2[key], obj2[key]), status: 'updated', oldValue: obj1[key], type: 'node',
        };
      }
      if (obj1[key] === obj2[key]) {
        return {
          key, value: obj1[key], status: 'unchanged', type: 'leaf',
        };
      }
      return {
        key, value: obj2[key], status: 'updated', oldValue: obj1[key], type: 'leaf',
      };
    });
};

export default genDiffTree;
