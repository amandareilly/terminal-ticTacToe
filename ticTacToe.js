const readline = require('readline');

class Game {
    constructor() {
        this.board = this._makeBoard();
        this._outputStrs = {
            intro: 'Let\'s play Tic Tac Toe! The first player to get three in a row (horizontal, vertical, or diagonal) wins! \r',
            instructions: 'When it\'s your turn to move, enter \'row column \' with a space in between.  For example, to target the top left space, enter \'1 1\'.',
            badCommand: 'You must enter a row and a column, separated by a space.  for example, for the top left corner enter \'1 1\'.',
            invalidNum: 'Row and column numbers must be between 1 and 3, inclusive.',
            invalidMove: 'Sorry, that was not a valid move.  Please try again.',
            playerMoveSuccess: 'Computer\'s turn:',
            computerMoveSuccess: 'The computer placed a token at: ',
            playerMovePrompt: 'Your turn!  Please select a space to place your token.',
            gameOver: 'Game Over!'
        }
        this.gameOver = false;
    }
    start() {
        console.log(this._outputStrs.intro);
        console.log(this._outputStrs.instructions);
        this._printBoard();
        this._listen();
    }

    _processInput(line) {
        line = line.split(' ');
        if (line.length !== 2) {
            console.log(this._outputStrs.badCommand);
        } else if (parseInt(line[0]) < 1 || parseInt(line[0]) > 3 || parseInt(line[1]) < 1 || parseInt(line[1] > 3)) {
            console.log(this._outputStrs.invalidNum);
        } else {
            const move = this._addToken('X', parseInt(line[0]) - 1, parseInt(line[1]) - 1);
            if (!move) {
                console.log(this._outputStrs.invalidMove);
                this._printBoard();
            } else {
                if(!this.gameOver) {
                    console.log(this._outputStrs.playerMoveSuccess);
                    this._printBoard();
                    const move = this._aiMove();
                    console.log(this._outputStrs.computerMoveSuccess, `${move[0] + 1}, ${move[1] + 1}`);
                    if(!this.gameOver) {
                        console.log(this._outputStrs.playerMovePrompt);
                        this._printBoard();
                    } else {
                        console.log(this._outputStrs.gameOver);
                        this._stopListening();
                    }
                } else {
                    console.log(this._outputStrs.gameOver);
                    this._stopListening();
                }
            }
        }
    }

    _makeBoard() {
        return [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    }

    _listen() {
        this._rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this._rl.on('line', (line) => {
            this._processInput(line);
        });
    }

    _stopListening() {
        this._rl.close();
    }

    _printBoard() {
        console.log('');
        for(let i = 0; i < 3; i++) {
            console.log(this.board[i].join('|'));
        }
        console.log('');
    }

    _addToken(token, row, column) {
        if(this.board[row][column] === '-') {
            this.board[row][column] = token;
            this._checkBoard();
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
        this.gameOver = true;
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
                return [row, column];
            }
        } while(!found);
    }
}

const game = new Game();
game.start();
