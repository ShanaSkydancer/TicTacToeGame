'use strict';

module.exports = function WinningConditions() {
    this.patterns = [
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
}