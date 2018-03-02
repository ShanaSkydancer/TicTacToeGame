const WinningConditions = require('../src/WinningConditions');
const OPatterns = require('../src/OPatterns');

var patternsTwo = [
  [(/  X . X  /), 1],
  [(/ XX....../), 0],
  [(/X..X.. ../), 6],
  [(/......XX /), 8],
  [(/.. ..X..X/), 2],
  [(/ ..X..X../), 0],
  [(/...... XX/), 6],
  [(/..X..X.. /), 8],
  [(/XX ....../), 2],
  [(/ ...X...X/), 0],
  [(/..X.X. ../), 6],
  [(/X...X... /), 8],
  [(/.. .X.X../), 2],
  [(/X X....../), 1],
  [(/X.. ..X../), 3],
  [(/......X X/), 7],
  [(/..X.. ..X/), 5],
  [(/. ..X..X./), 1],
  [(/... XX.../), 3],
  [(/.X..X.. ./), 7],
  [(/...XX .../), 5],
  [(/ X X.. ../), 0],
  [(/ ..X.. X /), 6],
  [(/.. ..X X /), 8],
  [(/ X ..X.. /), 2],
  [(/  XX.. ../), 0],
  [(/X.. .. X /), 6],
  [(/.. .XX   /), 8],
  [(/X  ..X.. /), 2],
  [(/ X  ..X../), 0],
  [(/ ..X..  X/), 6],
  [(/..X..  X /), 8],
  [(/X  ..X.. /), 2]
];

var board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
var X = 'X';
var O = 'O';
var players = [X, O];
var currentTurn = X;

function computer() {
  var x = getPatternOne();

  if (x == -1) {
    x = getPatternTwo();
    if (x == -1) {
      x = getMove();
    }
  }

  move(x, O);
};

function move(position, x) {
  if (x != currentTurn) {
    return false;
  }

  if (+position >= 0 && +position <= 8 && !isNaN(+position) && board[+position] == ' ') {
    board.splice(+position, 1, x);
    currentTurn = (x == X) ? O : X;
    return true;
  }

  return false;
};

function boardDisplay() {
  return ' ' + board[0] + ' |' + ' ' + board[1] + ' |' + ' ' + board[2] + '\n===+===+===\n' + ' ' + board[3] + ' |' + ' ' + board[4] + ' |' + ' ' + board[5] + '\n===+===+===\n' + ' ' + board[6] + ' |' + ' ' + board[7] + ' |' + ' ' + board[8]
};

 function filledBoard() {
  x = getMove()
  if (x == -1) {
    return true
  }
  return false
};

function winner() {
  var winningConditions = new WinningConditions();

  var boardString = board.join('');
  var theWinner = null;
  var currentPosition = winningConditions.patterns;

  for (i = 0; i < currentPosition.length; i++) {
    var isMatch = boardString.match(currentPosition[i][0]);
    if (isMatch) {
      theWinner = currentPosition[i][1];
    }
  }

  if (theWinner) {
    return true;
  }

  return false;
};

function getPatternOne() {
  var boardString = board.join('');
  var oPatterns = new OPatterns;
  var currentPattern = oPatterns.sequence;

  for (i = 0; i < currentPattern.length; i++) {
    var array = boardString.match(currentPattern[i][0]);
    if (array) {
      return currentPattern[i][1];
    }
  }

  return -1;
};

 function getPatternTwo() {
  var boardString = board.join('');

  for (i = 0; i < patternsTwo.length; i++) {
    var array = boardString.match(patternsTwo[i][0]);
    if (array) {
      return patternsTwo[i][1];
    }
  }

  return -1;
};

function getMove() {
  if (board[4] == ' ') {
    return 4;
  }

  return board.indexOf(' ');
};

function exit() {
  process.exit();
};

function play(input) {
    if (move(input, X)) {
      if (winner()) {
        return boardDisplay() + "\n" + X + " has won the game.";
      } 
      
      if (filledBoard()) {
        return boardDisplay() + "\nDraw!";
      }

      return computerMove();
  }
};

function computerMove() {
  computer();

  if (winner()) {
    return boardDisplay() + "\n" + O + " has won the game.";
  } 
  
  if (filledBoard()) {
    return boardDisplay() + "\nDraw!";
  }

  return boardDisplay();
}

function prompt() {
  console.log(boardDisplay());
  console.log("Enter [0-8]:");
  process.openStdin().on('data', function (result) {
    console.log(play(result));
  })
};

prompt();
