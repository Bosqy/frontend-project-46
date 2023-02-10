const getLabel = (action) => {
  switch (action) {
    case 'inFirst':
      return 'removed';
    case 'inSecond':
      return 'added';
    default:
      return 'unchanged';
  }
};

const formatType = (data) => {
  if (data === '[complex value]' || typeof (data) !== 'string') {
    return data;
  }
  return `'${data}'`;
};

const getPlain = (tree) => {
  const plainTree = [];
  const iter = (innerTree, path) => {
    const content = innerTree.reduce((acc, el) => {
      const label = getLabel(el.action);
      const property = path === '' ? el.key : path.concat('.', el.key);
      if (el.type === 'leaf') {
        const { value } = el;
        acc.push({ property, label, value });
        return acc;
      }
      const value = '[complex value]';
      acc.push({ property, label, value });
      return iter(el.value, property);
    }, plainTree);
    return content;
  };
  return iter(tree, '')
    .filter((node) => node.label !== 'unchanged')
    .reduce((acc, node, index, innerTree) => {
      if (index < innerTree.length - 1 && innerTree[index + 1].property === node.property) {
        const { property } = node;
        const label = 'updated';
        const from = node.value;
        const to = innerTree[index + 1].value;
        acc.push({
          property, label, from, to,
        });
        return acc;
      }
      if (index > 0 && innerTree[index - 1].property === node.property) {
        return acc;
      }
      acc.push(node);
      return acc;
    }, [])
    .map((node) => {
      switch (node.label) {
        case 'added':
          return ''.concat(
            'Property ',
            formatType(node.property),
            ' was added with value: ',
            formatType(node.value),
          );
        case 'removed':
          return ''.concat('Property ', formatType(node.property), ' was removed');
        case 'updated':
          return ''.concat(
            'Property ',
            formatType(node.property),
            ' was updated. From ',
            formatType(node.from),
            ' to ',
            formatType(node.to),

          );
        default:
          return 'Unknown error';
      }
    })
    .join('\n');
};

export default getPlain;
