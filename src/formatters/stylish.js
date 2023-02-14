const getStylishLabel = (status) => {
  switch (status) {
    case 'updated':
      return '+-';
    case 'unchanged':
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
      if (el.type === 'leaf') {
        if (stylishLabel === '+-') {
          const indentRemoved = indent.slice(0, -2).concat(getStylishLabel('removed'));
          const indentAdded = indent.slice(0, -2).concat(getStylishLabel('added'));
          const oldValue = Array.isArray(el.oldValue) ? iter(el.oldValue, depth + 1) : el.oldValue;
          return `${indentRemoved}${el.key}: ${oldValue}\n${indentAdded}${el.key}: ${el.value}`;
        }
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
