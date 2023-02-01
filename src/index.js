import _ from 'lodash';
import { readFileSync } from 'node:fs';
import * as path from 'path'
import process from 'node:process'

const ReadJSON = (file) => {
  const pwd = process.cwd();
    const pathToFile = path.resolve(pwd, file)
    if (!pathToFile.endsWith('\.json')) {
        return null 
    }
  const fileContent = readFileSync(file, 'utf8');
  return JSON.parse(fileContent);
};


const genDiff = (...files) => {
  const [file1, file2] = files
        .map(ReadJSON)
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
    return `{\n${diffFormatted}\n}`;
};
export default genDiff;
