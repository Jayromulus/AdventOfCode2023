const fs = require('fs');
const characterRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/\\#@]/;

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  const lines = data.split(`\r\n`);
  const schematic = lines.map(line => line.split(''));
  const validGears = [];
  const validGearIndexes = [];

  schematic.forEach((schematicLine, yIndex) => {
    schematicLine.forEach((character, xIndex) => {
      let validGear = false;
      // console.log('boundary:',checkBoundary(xIndex, schematicLine.length))

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

      left = schematic[checkBoundary(yIndex, schematicLine.length)][checkBoundary(xIndex - 1, schematicLine.length)];
      right = schematic[checkBoundary(yIndex, schematicLine.length)][checkBoundary(xIndex + 1, schematicLine.length)];

      if (yIndex !== schematic.length - 1) {
        bottomLeft = schematic[checkBoundary(yIndex + 1, schematicLine.length)][checkBoundary(xIndex - 1, schematicLine.length)];
        bottomMiddle = schematic[checkBoundary(yIndex + 1, schematicLine.length)][checkBoundary(xIndex, schematicLine.length)];
        bottomRight = schematic[checkBoundary(yIndex + 1, schematicLine.length)][checkBoundary(xIndex + 1, schematicLine.length)];
      }
      
      // if(yIndex === 0) { // log can be between lines 0 and 139
      //   console.log({
      //     topLeft,
      //     topMiddle,
      //     topRight,
      //     left,
      //     right,
      //     bottomLeft,
      //     bottomMiddle,
      //     bottomRight
      //   });
      // }
        
      if (characterRegex.test(topLeft)) validGear = true;
      if (characterRegex.test(topMiddle)) validGear = true;
      if (characterRegex.test(topRight)) validGear = true;
      if (characterRegex.test(left)) validGear = true;
      if (characterRegex.test(right)) validGear = true;
      if (characterRegex.test(bottomLeft)) validGear = true;
      if (characterRegex.test(bottomMiddle)) validGear = true;
      if (characterRegex.test(bottomRight)) validGear = true;

      if (validGear) findFullNumber(schematic, xIndex, yIndex, validGearIndexes, validGears, lines);
    });
  });

  // console.log({validGears}); // all valid gears
  console.log(validGears.reduce((a, b) => a + b, 0))

  const uniqueValues = validGears.every((value, index, gears) => {
    return gears.indexOf(value) === gears.lastIndexOf(value)
  })

  console.log({uniqueValues});
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

  while (initialIndex === -1) {
    if (numCheck.test(schematic[y][initialSeed-1])) {
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

  if (numCheck.test(number) && !validGears.includes(parseInt(number))) {
    validGears.push(parseInt(number));
  }

  //! 559957 too high
  //! 340755 too low

  // console.log({initialIndex, endingIndex});
}