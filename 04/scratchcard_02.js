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
        cardBlock.number = parseInt(inner.split(' ').filter(n => n !== '')[1])
      else if(i === 1)
        cardBlock.references = inner.split(' ').filter(n => n !== '')
      else
        cardBlock.checkers = inner.split(' ').filter(n => n !== '')
      })

      cardList.push(cardBlock);
    })

  for (card of cardList) {
    card.score = 0

    card.references.forEach(num => {
      if (card.checkers.includes(num)) {
        // if (card.number === 101) console.log('score');
        card.score++;
      }
    })

    for (;card.score > 0; card.score--) {
      const newCard = {...cardList.find(val => val.number === card.number + card.score)}
      // console.log({newCard})
      cardList.push(newCard);
    }

    // return score;
  }

  console.log({'# of cards': cardList.length});

  // console.log(scoreList.reduce((a, b) => a + b, 0))
});

// better way to do this would be to score card in place and create a buffer to keep track of how many copies of a given card I need as I get to that card