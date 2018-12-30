const readline = require('readline');

class Game {
    constructor() {
        this.board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    }
    start() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        console.log("Let's play tic tac toe.");
        console.log("To make a move, enter 'row' 'column' with a space in between.  Count from left to right and top to bottom.");
        this._printBoard();
        rl.on('line', (line) => {
            line = line.split(' ');
            if(line.length !== 2) {
                console.log('You must enter a row and a column, separated by a space.  For example, for the top left corner enter "1 1".');
            } else if(parseInt(line[0]) < 1 || parseInt(line[0]) > 3 || parseInt(line[1]) < 1 || parseInt(line[1] > 3)) {
                console.log('Row and column numbers must be between 1 and 3, inclusive.');
            } else {
                const move = this._addToken('X', parseInt(line[0])-1, parseInt(line[1])-1);
                if(!move) {
                    console.log('Sorry, that was not a valid move, try again.');
                    this._printBoard();
                } else {
                    console.log('Success!  Computer\'s turn');
                    this._printBoard();
                    this._aiMove();
                    this._printBoard();
                }
            }
        });
    }

    _printBoard() {
        for(let i = 0; i < 3; i++) {
            console.log(this.board[i].join('|'));
        }
    }

    _addToken(token, row, column) {
        if(this.board[row][column] === '-') {
            this.board[row][column] = token;
            return true;
        } else {
            return false;
        }
    }

    _checkBoard() {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j< 3; j++) {
                if(this.board[i][j] === '-') {
                    return false;
                }
            }
        }
        return true;
    }

    _aiMove() {
        if(this._checkBoard()) {
            throw('No legal moves!');
        }
        let found = false;
        let row, column;
        do {
            row = Math.floor(Math.random() * 3);
            column = Math.floor(Math.random() * 3);
            if(this._addToken('O', row, column)) {
                found = true;
            }
        } while(!found);
    }
}

const game = new Game();
game.start();
