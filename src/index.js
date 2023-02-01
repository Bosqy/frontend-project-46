import _ from 'lodash';
import { readFileSync } from 'node:fs';

const fileToJSON = (file) => {
  const fileContent = readFileSync(file, 'utf8');
  return JSON.parse(fileContent);
};

const genDiff = (...files) => {
  const [file1, file2] = files.map(fileToJSON).map(Object.entries)
    .map((json, index) => json.map((pair) => {
        const first = index === 0 ? '-' : '+';
        return _.concat(first, pair)}));
    const result = _.concat(file1, file2);
    const result2 =  result.map((rec) => {
        if ( result.filter((innerRec) => (rec[1] === innerRec[1] && rec[2] === innerRec[2])).length === 2) 
        {return [' ', rec[1], rec[2]]}
        return rec;

      })
    const result3 = _.sortBy(result2, [function(a) {return a[1]}])
     .map((innerRec) => `  ${innerRec[0]} ${innerRec[1]}: ${innerRec[2]}`)
    console.log(_.uniq(result3).join('\n'));
};

export default genDiff;

genDiff('/home/groo/frontend-project-46/fixtures/file1.json', '/home/groo/frontend-project-46/fixtures/file2.json');
