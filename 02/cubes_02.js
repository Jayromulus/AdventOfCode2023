/*
  Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

  combine id's of valid games, answer is 8

  ! rework to find minimum number required to make any given game function as "valid", this is going to mostly change the checkValidGame function

  multiply each minimum cube number by each other for the individual game power and then add all powers together for the answer
*/

const fs = require('fs');
const letterRegex = /[a-z]| */gi;
const gamePieces = {
  red: 12,
  green: 13,
  blue: 14
}

fs.readFile('./input.txt', 'utf-8', gameCalculator)

function gameCalculator(err, games) {
  if (err) throw err;

  const seperated = seperateGames(games);
  
  const gameKeys = Object.keys(seperated);

  const validGameIDs = gameKeys.map(key => checkValidGame(seperated, key));

  const validScore = validGameIDs.reduce((a, b) => { return a + b }, 0);

  console.log({ validScore });
}

function seperateGames(games) {
  const splitGames = games.split('\r\n');
  individualGames = {};
  splitGames.map((game, index) => individualGames[index+1] = game.split(/\: |\; |\, /).slice(1))
  return individualGames;
}

function checkValidGame(gamesList, gameID) {
  const currentGame = gamesList[gameID];

  let validGame = true;
  const validity = [];

  currentGame.forEach(check => {
    switch(true) {
      case check.includes('red'):
        let redBalls = parseInt(check.replace(letterRegex, ''));
        validGame = redBalls <= gamePieces.red;
        // console.log(redBalls <= gamePieces.red);
        validity.push(validGame ? 0 : 1);
        break;
      case check.includes('green'):
        greenBalls = parseInt(check.replace(letterRegex, ''));
        validGame = greenBalls <= gamePieces.green;
        validity.push(validGame ? 0 : 1);
        // console.log(validGame);
        if(!validGame) return 0;
        break;
      case check.includes('blue'):
        const blueBalls = parseInt(check.replace(letterRegex, ''));
        validGame = blueBalls <= gamePieces.blue;
        validity.push(validGame ? 0 : 1);
        // console.log(blueBalls <= gamePieces.blue);
        if(!validGame) return 0;
        break;
      default:
        return 0;
    }
  })
  // console.log({validGame, validity});

  // only games who have no penalties applied are actually valid
  validGame = validity.reduce((a, b) => { return a + b }, 0) === 0;

  // console.log(currentGame);
  return validGame ? parseInt(gameID) : 0;
}