'use strict';

const TicTacToe = require('../src/TicTacToe');

module.exports = function BoardManager(ticTacToe) {
    this.X = 'X';
    this.O = 'O';
    this.players = [this.X, this.O];
    this.currentTurn = this.X;
}