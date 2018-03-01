var patternsOne = [
  [(/ OO....../), 0],
  [(/O..O.. ../), 6],
  [(/......OO /), 8],
  [(/.. ..O..O/), 2],
  [(/ ..O..O../), 0],
  [(/...... OO/), 6],
  [(/..O..O.. /), 8],
  [(/OO ....../), 2],
  [(/ ...O...O/), 0],
  [(/..O.O. ../), 6],
  [(/O...O... /), 8],
  [(/.. .O.O../), 2],
  [(/O O....../), 1],
  [(/O.. ..O../), 3],
  [(/......O O/), 7],
  [(/..O.. ..O/), 5],
  [(/. ..O..O./), 1],
  [(/... OO.../), 3],
  [(/.O..O.. ./), 7],
  [(/...OO .../), 5]
];

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

var patternsThree = [
  [(/OOO....../), 'O'],
  [(/...OOO.../), 'O'],
  [(/......OOO/), 'O'],
  [(/O..O..O../), 'O'],
  [(/.O..O..O./), 'O'],
  [(/..O..O..O/), 'O'],
  [(/O...O...O/), 'O'],
  [(/..O.O.O../), 'O'],
  [(/XXX....../), 'X'],
  [(/...XXX.../), 'X'],
  [(/......XXX/), 'X'],
  [(/X..X..X../), 'X'],
  [(/.X..X..X./), 'X'],
  [(/..X..X..X/), 'X'],
  [(/X...X...X/), 'X'],
  [(/..X.X.X../), 'X']
];

var board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
var X = 'X';
var O = 'O';
var players = [X, O];
var currentTurn = X;

function computer () {
  x = getPatternOne()
  if (x == -1) {
    x = getPatternTwo()
    if (x == -1) {
      x = getMove()
    }
  }
  move(x, O)
};

function move (position, x) {
  if (x != currentTurn) {
    return false
  }
  if (+position >= 0 && +position <= 8 && !isNaN(+position) && board[+position] == ' ') {
    board.splice(+position, 1, x)
    currentTurn = (x == X) ? O : X
    return true
  }
  return false
};

function boardDisplay () {
  return ' ' + board[0] + ' |' + ' ' + board[1] + ' |' + ' ' + board[2] + '\n===+===+===\n' + ' ' + board[3] + ' |' + ' ' + board[4] + ' |' + ' ' + board[5] + '\n===+===+===\n' + ' ' + board[6] + ' |' + ' ' + board[7] + ' |' + ' ' + board[8]
};

function show () {
  console.log(boardDisplay());
}

 function filledBoard () {
  x = getMove()
  if (x == -1) {
    show()
    console.log('Game over')
    return true
  }
  return false
};

function winner () {
  boardString = board.join('')
  theWinner = null
  for (i = 0; i < patternsThree.length; i++) {
    array = boardString.match(patternsThree[i][0])
    if (array) {
      theWinner = patternsThree[i][1]
    }
  }
  if (theWinner) {
    show()
    console.log('Game over')
    return true
  }
  return false
};

function getPatternOne () {
  boardString = board.join('')
  for (i = 0; i < patternsOne.length; i++) {
    array = boardString.match(patternsOne[i][0])
    if (array) {
      return patternsOne[i][1]
    }
  }
  return -1
};

 function getPatternTwo () {
  boardString = board.join('')
  for (i = 0; i < patternsTwo.length; i++) {
    array = boardString.match(patternsTwo[i][0])
    if (array) {
      return patternsTwo[i][1]
    }
  }
  return -1
};

function getMove () {
  if (board[4] == ' ') {
    return 4
  }
  return board.indexOf(' ')
};

function exit () {
  process.exit()
};

function play () {
  show()
  console.log("Enter [0-8]:")
  process.openStdin().on('data', function (res) {
    if (move(res, X)) {
      if (winner() || filledBoard()) {
        exit()
      } else {
        computer()
        if (winner() || filledBoard()) {
          exit()
        } else {
          show()
        }
      }
    }
  })
};

play();
