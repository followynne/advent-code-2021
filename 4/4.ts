import { input } from './4_input';

console.warn('start');

const rowNum = 5;
const colNum = 5;
const data = input.boards.map((bd, i) => {
  const finalArrays: number[][] = [];
  for (let index = 0; index < rowNum + colNum; index++) {
    finalArrays[index] = [];
  }
  let tmpNum = 0;
  bd.forEach((num, i) => {
    // separate and fill the rows
    finalArrays[Math.floor(i / rowNum)].push(num);

    // separate and fill the columns
    finalArrays[tmpNum + colNum].push(num);
    tmpNum += tmpNum === colNum - 1 ? -4 : 1;
  });
  return finalArrays;
});
const inputDataReverse = [...data];

const solutionExtractor = (breakOutOnFirstWin: boolean) => {
  const arrUnderWork = [...input.input];
  const appendExtractions = [...arrUnderWork.splice(0, colNum)];
  let lastNumberWithMatch = 0;
  let res: number[][];
  for (let index = 0; index < arrUnderWork.length; index++) {
    appendExtractions.push(arrUnderWork[index]);
    const findIfWinner = (p: number[][]) => {
      const item = p.find((r) => {
        if (r.every((s) => appendExtractions.includes(s))) return true;
        return false;
      });
      return !!item;
    };
    if (breakOutOnFirstWin) {
      const isFoundOnFirst = data.find((p, i) => findIfWinner(p));
      res = isFoundOnFirst;
      if (res) break;
    }

    if (!breakOutOnFirstWin) {
      const isFound = inputDataReverse.filter((p, i) => findIfWinner(p));
      if (isFound.length && !breakOutOnFirstWin) {
        lastNumberWithMatch = arrUnderWork[index];
        res = [...isFound[isFound.length - 1]];

        isFound.forEach((ff) => {
          inputDataReverse.splice(inputDataReverse.indexOf(ff), 1);
        });
      }
    }
  }
  const finalExtractedItems = breakOutOnFirstWin
    ? appendExtractions
    : appendExtractions.slice(
        0,
        appendExtractions.indexOf(lastNumberWithMatch) + 1,
      );
  return { res, appendExtractions: finalExtractedItems };
};

function onlyUnique<T>(value: T, index: number, self: T[]) {
  return self.indexOf(value) === index;
}

const printResult = (r: number[][], appendExtractions: number[]) => {
  const getUniques = r
    .flatMap((p) => [...p])
    .filter(onlyUnique)
    .filter(Boolean);
  const getUnmarked = getUniques.filter((e) => !appendExtractions.includes(e));

  console.debug(
    `first result: ${
      getUnmarked.reduce((f, c) => c + f, 0) *
      appendExtractions[appendExtractions.length - 1]
    }`,
  );
};

// 1 ----------------------------------------------
const { res, appendExtractions } = solutionExtractor(true);
printResult(res, appendExtractions);
console.log(res);

// 2 ----------------------------------------------
const { res: res2, appendExtractions: ap2 } = solutionExtractor(false);
printResult(res2, ap2);
console.log(res2);