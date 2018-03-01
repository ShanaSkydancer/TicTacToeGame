'use strict';

const games = require('../src/game.js');
const assert = require('assert');

describe('TicTacToe', function () {
    it('should announce a game won by the computer', function () {
        ticTacToe.play(0);
        ticTacToe.play(8);
        ticTacToe.play(7);
        
        assert.equal(ticTacToe.play(3), 
        `
         X | O | O 
        ===+===+===
         X | O |   
        ===+===+===
         O | X | X 
        `);
    });
});