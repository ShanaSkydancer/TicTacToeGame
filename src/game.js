const WinningConditions = require('../src/WinningConditions');
const OPatterns = require('../src/OPatterns');
const XPatterns = require('../src/XPatterns');
const TicTacToe = require('../src/TicTacToe');

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
  var ticTacToe = new TicTacToe();
  var board = ticTacToe.board;

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
  var ticTacToe = new TicTacToe();
  var board = ticTacToe.board;
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
  var ticTacToe = new TicTacToe();
  var board = ticTacToe.board;

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
  var ticTacToe = new TicTacToe();
  var board = ticTacToe.board;
  var boardString = board.join('');
  var oPatterns = new OPatterns;
  var currentPattern = oPatterns.sequence;

  for (i = 0; i < currentPattern.length; i++) {
    var isMatch = boardString.match(currentPattern[i][0]);
    if (isMatch) {
      return currentPattern[i][1];
    }
  }

  return -1;
};

 function getPatternTwo() {
  var ticTacToe = new TicTacToe();
  var board = ticTacToe.board;
  var boardString = board.join('');
  var xPatterns = new XPatterns();
  var currentPattern = xPatterns.sequence;

  for (i = 0; i < currentPattern.length; i++) {
    var isMatch = boardString.match(currentPattern[i][0]);
    if (isMatch) {
      return currentPattern[i][1];
    }
  }

  return -1;
};

function getMove() {
  var ticTacToe = new TicTacToe();
  var board = ticTacToe.board;
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
