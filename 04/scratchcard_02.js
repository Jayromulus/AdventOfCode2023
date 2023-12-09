const fs = require('fs');
const initialSplit = /\r\n/;
const parseSplitRegex = /:|\|/g;

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  let cardNum = 0;
  let cardList = [];
  // parse the file into just numbers, this will make an array with 2 arrays inside. the first containing all card numbers, the second containing the list to check for matches
  const inputLines = data.split(initialSplit);
  const parsedLines = inputLines.map(line => line.split(parseSplitRegex));
  const runtime = parsedLines.map((line, index) => {
    let cardBlock = {};

    line.map((inner, i) => {
      if(i === 0)
        cardBlock.number = inner.split(' ').filter(n => n !== '').splice(1)
      else if(i === 1)
        cardBlock.references = inner.split(' ').filter(n => n !== '')
      else
        cardBlock.checkers = inner.split(' ').filter(n => n !== '')
      })

      cardList.push(cardBlock);
    })
    console.log({test: cardList[100]});

  let scoreList = cardList.map(card => {
    let score = 0

    card.references.forEach(num => {
      if (card.checkers.includes(num))
        score > 0 ? score *= 2 : score++;
    })

    return score;
  })

  console.log(scoreList.reduce((a, b) => a + b, 0))
});

// better way to do this would be to score card in place and create a buffer to keep track of how many copies of a given card I need as I get to that card