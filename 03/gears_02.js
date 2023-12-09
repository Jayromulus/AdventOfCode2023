const fs = require('fs');
const characterRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/\\#@]/;
const digitRegex = /\d/;

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  const lines = data.split(`\r\n`);
  const schematic = lines.map(line => line.split(''));
  const validGears = [];
  const validGearIndexes = [];
  const ratioMarkerIndexes = [];

  schematic.forEach((schematicLine, yIndex) => {
    schematicLine.forEach((character, xIndex) => {
      let validGear = false;
      let ratioMarker = false;

      let topLeft;
      let topMiddle;
      let topRight;
      let left;
      let right;
      let bottomLeft;
      let bottomMiddle;
      let bottomRight;

      if (yIndex !== 0) {
        topLeft = schematic[checkBoundary(yIndex - 1, schematicLine.length)][checkBoundary(xIndex - 1, schematicLine.length)];
        topMiddle = schematic[checkBoundary(yIndex - 1, schematicLine.length)][checkBoundary(xIndex, schematicLine.length)];
        topRight = schematic[checkBoundary(yIndex - 1, schematicLine.length)][checkBoundary(xIndex + 1, schematicLine.length)];
      }

      left = schematicLine[checkBoundary(xIndex - 1, schematicLine.length)];
      right = schematicLine[checkBoundary(xIndex + 1, schematicLine.length)];

      if (yIndex !== schematic.length - 1) {
        bottomLeft = schematic[checkBoundary(yIndex + 1, schematicLine.length)][checkBoundary(xIndex - 1, schematicLine.length)];
        bottomMiddle = schematic[checkBoundary(yIndex + 1, schematicLine.length)][checkBoundary(xIndex, schematicLine.length)];
        bottomRight = schematic[checkBoundary(yIndex + 1, schematicLine.length)][checkBoundary(xIndex + 1, schematicLine.length)];
      }

      // if one of these is a symbol and specifically an asterisk, note the position and checkfor numbers which may index between the locations this might be
      //  this should be stored in a seperate array, and then loop over the seperate array checking if the x y exists between/adjacent to the postion of a valid gear before taking those valid gears, adding their product to a validRatios array, and then summing that

      if (
        digitRegex.test(schematic[yIndex][xIndex]) && (
        characterRegex.test(topLeft) ||
        characterRegex.test(topMiddle) ||
        characterRegex.test(topRight) ||
        characterRegex.test(left) ||
        characterRegex.test(right) ||
        characterRegex.test(bottomLeft) ||
        characterRegex.test(bottomMiddle) ||
        characterRegex.test(bottomRight))
      ) validGear = true;

      if(schematic[yIndex][xIndex] === '*') ratioMarker = true;

      validGear && findFullNumber(schematic, xIndex, yIndex, validGearIndexes, validGears, lines);
      ratioMarker && ratioMarkerIndexes.push(`${yIndex}, ${xIndex}`);
    });
  });
  
  // console.log({ validGears })
  const total = validGears.reduce((a, b) => a + b, 0);

  console.log({ratioMarkerIndexes});
  // maybe loop over array, mark each item with which ratio markers are near it, then check if a marker has multiple gears?
  console.log({ total })

  fs.writeFile('output.txt', validGearIndexes.join('\n'), (err) => {
    if (err) throw err;
  })
});

function checkBoundary(num, limit) {
  return num < limit && num >= 0 ? num : -1
};

function findFullNumber(schematic, x, y, validIndexes, validGears, lines) {
  const numCheck = /\d/
  let initialSeed = x;
  let endingSeed = x;
  let initialIndex = -1;
  let endingIndex = -1;

  while (initialIndex === -1) {
    if (numCheck.test(schematic[y][initialSeed - 1])) {
      initialSeed--;
    } else {
      initialIndex = initialSeed;
      break;
    }
  }

  while (endingIndex === -1) {
    if (numCheck.test(schematic[y][endingSeed])) {
      endingSeed++;
    } else {
      endingIndex = endingSeed;
      break;
    }
  }

  const number = lines[y].substring(initialIndex, endingIndex);

  const indexString = `y: ${y}, init: ${initialIndex}, end: ${endingIndex}, num: ${number}`;
  
  if (number && !validIndexes.includes(indexString)) {
    validIndexes.push(indexString)
    validGears.push(parseInt(number));
  }
}