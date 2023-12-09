const fs = require('fs');
const initialSplit = /\r\n/;
const parseSplitRegex = /:|\|/g;

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  // parse the file into just numbers, this will make an array with 2 arrays inside. the first containing all card numbers, the second containing the list to check for matches
  const inputLines = data.split(initialSplit);
  const parsedLines = inputLines.map(line => line.split(parseSplitRegex).splice(1));
  const numbers = parsedLines.map(line => line.map(inner => inner.split(' ').filter(n => n !== '')))
  // console.log(numbers);

  let scoreList = numbers.map(card => {
    let score = 0

    card[0].forEach(num => {
      if (card[1].includes(num))
        score > 0 ? score *= 2 : score++;
    })

    return score;
  })

  console.log(scoreList.reduce((a, b) => a + b, 0))
});