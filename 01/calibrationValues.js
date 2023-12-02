// const fs = require('fs');
// const reg = /[A-Za-z]*/;

// const one = /one/gi;
// const two = /two/gi;
// const three = /three/gi;
// const four = /four/gi;
// const five = /five/gi;
// const six = /six/gi;
// const seven = /seven/gi;
// const eight = /eight/gi;
// const nine = /nine/gi;

// let calibrationValues;

// function replaceRegex(line) {
//   console.log(line);
//   line = line.replace(one, '1');
//   line = line.replace(two, '2');
//   line = line.replace(three, '3');
//   line = line.replace(four, '4');
//   line = line.replace(five, '5');
//   line = line.replace(six, '6');
//   line = line.replace(seven, '7');
//   line = line.replace(eight, '8');
//   line = line.replace(nine, '9');

//   console.log(line);
//   return line;
// }

// fs.readFile('./calibration.txt', 'utf-8', (err, data) => {
// 	if (err) throw err;

// 	const lines = data.split('\r\n');

// 	calibrationValues = lines.map(line => {
// 		// let seed = line.split(reg).join('');
// 		// let bully;
// 		let newLine = replaceRegex(line);
// 		let seed = newLine.split(reg).join('');
// 		let newSeed = parseInt(seed.length === 0 ? '0' : seed.length > 1 ? seed[0] + seed[seed.length - 1] : seed[0] + seed[0]);

// 		console.log({seed, line})
// 		return newSeed;
// 	});

// 	console.log({calibrationValues});

// 	let calibrationTotal = calibrationValues.reduce((a, b) => { test = b; return a + b }, 0);

// 	// console.log({calibrationValues});
// 	console.log(calibrationTotal);
// 	console.log({ test });
// });

// PART 2

const fs = require("fs");
const reg = /[A-Za-z]*/;
// lookahead to allow multiple checks that overlap and give back a list of different regex matches including index and the term
const numReplace = /(?=(one|two|three|four|five|six|seven|eight|nine))/gi;
const numDict = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let calibrationValues;

function replaceRegex(line) {
  let matches = line.matchAll(numReplace);

  // console.log(matches);

  const goodMatches = [...matches];
  // console.log(goodMatches[0][1])
  let high = {
    index: 0,
    number: 0,
  };
  let low = {
    index: 0,
    number: 0,
  };
  let single = true;
  goodMatches.forEach((match, i) => {
    let matchIndex = match.index;
    let matchNumber = match[1];
    if (i === 0) {
      high.index = matchIndex;
      high.number = numDict[matchNumber];
      low.index = matchIndex;
      low.number = numDict[matchNumber];
    } else {
      if (high.index > matchIndex) {
        high.index = matchIndex;
        high.number = numDict[matchNumber];
      }
      if (low.index < matchIndex) {
        low.index = matchIndex;
        low.number = numDict[matchNumber];
      }
    }

    single = low.index === high.index && low.number === high.number
  });

  if (single) {
    if (high.number !== 0)
      line = line.substring(0, high.index + 1) + high.number + line.substring(high.index+1);
    else if (low.number !== 0)
      line = line.substring(0, low.index + 1) + low.number + line.substring(low.index+1);
  } else {
    if (high.number !== 0)
      line = line.substring(0, high.index + 1) + high.number + line.substring(high.index+1);
    if (low.number !== 0)
      line = line.substring(0, low.index + 1) + low.number + line.substring(low.index+1);
  }
  // console.log(high);

  // console.log(low);
  return line;
}

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data.split("\r\n");

  calibrationValues = lines.map((line) => {
    // let seed = line.split(reg).join('');
    // let bully;
    let newLine = replaceRegex(line);
    let seed = newLine.split(reg).join("");
    let calibrationNumber = parseInt(
      seed.length === 0
        ? "0"
        : seed.length > 1
        ? seed[0] + seed[seed.length - 1]
        : seed[0] + seed[0]
    );

    console.log({ seed, line, calibrationNumber });
    return calibrationNumber;
  });

  console.log({ calibrationValues });

  let calibrationTotal = calibrationValues.reduce((a, b) => {
    test = b;
    return a + b;
  }, 0);

  // console.log({calibrationValues});
  console.log(calibrationTotal);
  // console.log({ test });
});
