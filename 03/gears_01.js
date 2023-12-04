const fs = require('fs');
const characterRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/\\#@]/

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  const lines = data.split(`\r\n`);
  // console.log('line 1, char 28:', lines[0][28]);
  // console.log('line 2, char 28:', lines[1][28]);
  const schematic = lines.map(line => line.split(''));
  const validGears = [];
  const validGearIndexes = [];

  // console.log('test:', characterRegex.test('#'));

  schematic.forEach((schematicLine, yIndex) => {
    // console.log(yIndex)
    schematicLine.forEach((character, xIndex) => {
      let validGear = false;
      
      const topLeft = schematic[checkBoundary(yIndex - 1, schematicLine.length)][checkBoundary(xIndex - 1, schematicLine.length)];
      const topMiddle = schematic[checkBoundary(yIndex - 1, schematicLine.length)][checkBoundary(xIndex, schematicLine.length)];
      const topRight = schematic[checkBoundary(yIndex - 1, schematicLine.length)][checkBoundary(xIndex + 1, schematicLine.length)];
      const left = schematic[checkBoundary(yIndex, schematicLine.length)][checkBoundary(xIndex - 1, schematicLine.length)];
      const right = schematic[checkBoundary(yIndex, schematicLine.length)][checkBoundary(xIndex + 1, schematicLine.length)];
      const bottomLeft = schematic[checkBoundary(yIndex + 1, schematicLine.length)][checkBoundary(xIndex - 1, schematicLine.length)];
      const bottomMiddle = schematic[checkBoundary(yIndex + 1, schematicLine.length)][checkBoundary(xIndex, schematicLine.length)];
      const bottomRight = schematic[checkBoundary(yIndex + 1, schematicLine.length)][checkBoundary(xIndex + 1, schematicLine.length)];

      // console.log(character)
      if (characterRegex.test(topLeft)) validGear = true;
      if (characterRegex.test(topMiddle)) validGear = true;
      if (characterRegex.test(topRight)) validGear = true;
      if (characterRegex.test(left)) validGear = true;
      if (characterRegex.test(right)) validGear = true;
      if (characterRegex.test(bottomLeft)) validGear = true;
      if (characterRegex.test(bottomMiddle)) validGear = true;
      if (characterRegex.test(bottomRight)) validGear = true;

      // if(character === '7' && xIndex === 28)
      //   console.log({validGear, character, bottomMiddle, yIndex, xIndex})
      // console.log(validGear);
      if (validGear) findFullNumber(schematic, xIndex, yIndex, validGearIndexes, validGears, lines);
    });
  });

	console.log({validGears});
  // console.log({row1: validGearIndexes.filter(str => str.includes('x: 3,'))})
  console.log(validGears.reduce((a, b) => a + b, 0))
});

function checkBoundary(num, limit) {
	return num < limit && num > 0 ? num : 0
};

function findFullNumber(schematic, x, y, validIndexes, validGears, lines) {
  const numCheck = /\d/
  let initialSeed = x;
  let endingSeed = x;
  let initialIndex = -1;
  let endingIndex = -1;
  // console.log('BEGIN FUNCTION RUN')

  // console.log('test known:', numCheck.test(schematic[0][28]))
  // console.log('test dot:', numCheck.test(schematic[0][12]))

  while (initialIndex === -1) {
    if (numCheck.test(schematic[y][initialSeed-1])) {
      // console.log(schematic[x][initialSeed-1]);
      initialSeed--;
    } else {
      initialIndex = initialSeed;
      break;
    }
  }

  while (endingIndex === -1) {
    if (numCheck.test(schematic[y][endingSeed])) {
      // console.log(schematic[x][endingSeed+1]);
      endingSeed++;
    } else {
      endingIndex = endingSeed;
      break;
      // console.log({endingIndex});
    }
  }

  const number = lines[y].substring(initialIndex, endingIndex);
  const indexString = `y: ${y}, init: ${initialIndex}, end: ${endingIndex}, num: ${number}`;

  // console.log('check: ',numCheck.test(number));
  if (number !== '') console.log({number, included: validGears.includes(parseInt(number))})
  if (numCheck.test(number) && !validGears.includes(parseInt(number))) {
    // validIndexes.push(indexString);

    if (y < 10) console.log({number, y, initialIndex, endingIndex, validGears});
  
    validGears.push(parseInt(number));
  }

  //! 559957 too high
  //! 340755 too low

  // console.log({initialIndex, endingIndex});
}