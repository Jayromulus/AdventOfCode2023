const example = 'seven';
// const one = /one/gi;
// const two = /two/gi;
// const three = /three/gi;
// const four = /four/gi;
// const five = /five/gi;
// const six = /six/gi;
// const seven = /seven/gi;
// const eight = /eight/gi;
// const nine = /nine/gi;

const FuckYou = /(?=(one|two|three|four|five|six|seven|eight|nine))/gi;

const hate = 'oneeight9threevctrd4';

console.log(FuckYou.test(hate)); 

// let match = FuckYou.exec(hate);

let matches = hate.matchAll(FuckYou)

console.log(matches);

const goodMatches = [ ...matches ];
// console.log(goodMatches[0][1])
let high = {
  index: 0,
  number: ''
};
let low = {
  index: 0,
  number: ''
};
goodMatches.forEach((match, i) => {
  let matchIndex = match.index;
  let matchNumber = match[1];
  if (i === 0) {
    high.index = matchIndex;
    high.number = matchNumber;
    low.index = matchIndex;
    low.number = matchNumber;
  } else {
    if(high.index > matchIndex) {
      high.index = matchIndex;
      high.number = matchNumber;
    }
    if(low.index < matchIndex) {
      low.index = matchIndex;
      low.number = matchNumber;
    }
  }
})

console.log(high);

console.log(low);

// const example1 = 'onEasdlkjfhklsjdafsEvEnslkjhfgakjsdhf';
// const example2 = 'alsjdhfkjasdSeVEnlskjglasgsEvensakldjfalk;sjdf';

// const fuckThis = 'twoone23threeslkjefsaafour';

// function testTheory(exampleString) {

// 	console.log(one.test(exampleString));

// 	const division = exampleString.replace(one, '7');

// 	console.log(division);
// 	console.log(division.length - 1);
// }

// testTheory(example1);
// // testTheory(example2);
