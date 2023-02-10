import _ from 'lodash';

const genDiffTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const diffTree = [];
  _.difference(keys1, keys2)
    .reduce((acc, key) => {
      if (_.isObject(obj1[key])) {
        acc.push(
          {
            action: 'inFirst',
            type: 'node',
            key,
            value: genDiffTree(obj1[key], obj1[key]),
          },
        );
        return acc;
      }
      acc.push({
        action: 'inFirst', type: 'leaf', key, value: obj1[key],
      });
      return acc;
    }, diffTree);
  _.difference(keys2, keys1)
    .reduce((acc, key) => {
      if (_.isObject(obj2[key])) {
        acc.push(
          {
            action: 'inSecond',
            type: 'node',
            key,
            value: genDiffTree(obj2[key], obj2[key]),
          },
        );
        return acc;
      }
      acc.push({
        action: 'inSecond', type: 'leaf', key, value: obj2[key],
      });
      return acc;
    }, diffTree);
  _.intersection(keys1, keys2)
    .reduce((acc, key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        acc.push(
          {
            action: 'inBoth',
            type: 'node',
            key,
            value: genDiffTree(obj1[key], obj2[key]),
          },
        );
        return acc;
      }
      if (_.isObject(obj1[key]) && !_.isObject(obj2[key])) {
        acc.push(
          {
            action: 'inFirst',
            type: 'node',
            key,
            value: genDiffTree(obj1[key], obj1[key]),
          },
        );
        acc.push({
          action: 'inSecond', type: 'leaf', key, value: obj2[key],
        });
        return acc;
      }
      if (!_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        acc.push({
          action: 'inFirst', type: 'leaf', key, value: obj1[key],
        });
        acc.push(
          {
            action: 'inSecond',
            type: 'node',
            key,
            value: genDiffTree(obj2[key], obj2[key]),
          },
        );
        return acc;
      }
      if (obj1[key] === obj2[key]) {
        acc.push({
          action: 'inBoth', type: 'leaf', key, value: obj2[key],
        });
      } else {
        acc.push({
          action: 'inFirst', type: 'leaf', key, value: obj1[key],
        });
        acc.push({
          action: 'inSecond', type: 'leaf', key, value: obj2[key],
        });
      }
      return acc;
    }, diffTree);
  return _.sortBy(diffTree, ['key', 'action']);
};

export default genDiffTree;
