const getStylishLabel = (action) => {
  switch (action) {
    case 'inFirst':
      return '- ';
    case 'inSecond':
      return '+ ';
    default:
      return '  ';
  }
};

const getStylish = (tree) => {
  const replacer = '  ';
  const iter = (innerTree, depth) => {
    const content = innerTree.map((el) => {
      const stylishLabel = getStylishLabel(el.action);
      const indent = `${replacer.repeat(depth * 2 - 1)}${stylishLabel}`;
      if (el.type === 'leaf') {
        return `${indent}${el.key}: ${el.value}`;
      }
      return `${indent}${el.key}: ${iter(el.value, depth + 1)}`;
    });
    const closingBrace = `${replacer.repeat(depth * 2 - 2)}}`;
    return ['{', ...content, closingBrace].join('\n');
  };
  return iter(tree, 1);
};

export default getStylish;
