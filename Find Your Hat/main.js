const prompt = require('prompt-sync')({sigint: true});

/* Game symbols */
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

/* Other constants */
const up = 'up';
const down = 'down';
const left = 'left';
const right = 'right';


/* Class representing the game field */
class Field {
    constructor(field) {
        this.field = field; //Field.generateField
        this.playerHorPos = this.findPlayerStartPos()[0];
        this.playerVerPos = this.findPlayerStartPos()[1];
    }
    print() {
        this.field.forEach(element => {
            console.log(element.join(''));
        });
    }
    move(direction) {
        // check if good input
        switch (direction) {
            case up:
                // move +1 hor
                break;
            case down:
                // move -1 hor
                break;
            case left:
                // move -1 ver
                break;
            case right:
                // move +1 ver
                break;
            default:
                break;
        }
        // check if out of bounds
    }
    findPlayerStartPos() {
        for (let x = 0; x < this.field.length; x++) {
            for (let y = 0; y < this.field[x].length; y++) {
                if (this.field[x][y] === '*') {
                    return [x, y]
                }
            }
        }
    }
    //static generateField
}

/* Helper methods */

// input checker method: returns true or false for exit

/* Main game */
function playGame() {
    const gameField = new Field([
        ['*', '░', 'O'],
        ['░', 'O', '░'],
        ['░', '^', '░'],
    ]);

    let exit = false;

    do {
        // ask for input (move direction or exit to quit)
        const command = prompt('Input command: ');
        gameField.print();
        // after entering input print the current map and mark the tiles visited by pathCharacter
        // prompt for next move
        // continue until: win: finding the hat, lose: landing in a hole, move outside the field
        // when any of the above happens, inform user and end the game
        if (command === 'exit') {
            exit = true;
        }
    } while (!exit);
}

/* Start the game */
playGame();