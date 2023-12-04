const test = [['.', '.', '.', '*', '.', '.', '.', '.', '.', '.', '.', '.','.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.','.', '.', '.', '.',], ['.', '.', '.', '.', '.', '.', '.', '.','.', '.', '5', '9', '.','.', '.', '.', '.']];

findFullNumber(test, 2, 11);

function findFullNumber(schematic, x, y) {
  const numCheck = /\d/
  let initialSeed = x;
  let endingSeed = x;
  let initialIndex = -1;
  let endingIndex = -1;
  console.log('BEGIN FUNCTION RUN')

  console.log('test known:', numCheck.test(schematic[2][11]))
  console.log('test dot:', numCheck.test(schematic[2][8]))

  while (initialIndex === -1) {
    if (numCheck.test(schematic[initialSeed-1][y])) {
      initialSeed--;
      console.log(schematic[initialSeed-1][y]);
    } else {
      initialIndex = initialSeed;
      break;
    }
  }

  while (endingIndex === -1) {
    if (numCheck.test(schematic[endingSeed-1][y])) {
      endingSeed++;
      console.log(schematic[endingSeed-1][y]);
    } else {
      endingIndex = endingSeed;
      break;
      // console.log({endingIndex});
    }
  }

  console.log({initialIndex, endingIndex});
  console.log({number: schematic[initialIndex][endingIndex]});
}