import _ from 'lodash';
import { readFileSync } from 'node:fs';

const fileToJSON = (file) => {
  const fileContent = readFileSync(file, 'utf8');
  return JSON.parse(fileContent);
};

const genDiff = (...files) => {
  const [file1, file2] = files
        .map(fileToJSON)
        .map(Object.entries)
        .map((json) => json.map((line) => line.join(':')))
    const inBoth = _.intersection(file1, file2)
    const inFirst = _.difference(file1, file2)
    const inSecond = _.difference(file2, file1)
    const diff = _.flatten(
      [
        [' ', ...inBoth],
        ['-', ...inFirst],
        ['+', ...inSecond],
      ]
    .map((group) => {
      const [first, ...rest] = group;
      return rest.reduce((acc, line) => {
        const [key, value] = line.split(':')
        acc.push([first, key, value])
          return acc;
      }, [])
    })
    )
    const diffFormatted = _.sortBy(diff, [function(a) {return a[1]}])
      .map((innerRec) => `  ${innerRec[0]} ${innerRec[1]}: ${innerRec[2]}`)
      .join('\n');
//    console.log( `{\n${diffFormatted}\n}`);
    return `{\n${diffFormatted}\n}`;
};
export default genDiff;

//  genDiff('/home/groo/frontend-project-46/fixtures/file1.json', '/home/groo/frontend-project-46/fixtures/file2.json');

