const prompt = require('prompt-sync')({sigint: true});

/* Game symbols */
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

/* Other constants */
const directions = ['up', 'down', 'left', 'right'];

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
        switch (direction) {
            // check if out of bounds
            case directions[0]: //up
                // move +1 hor
                this.field[this.playerHorPos + 1][this.playerVerPos] = pathCharacter;
                break;
            case directions[1]: //down
                // move -1 hor
                break;
            case directions[2]: //left
                // move -1 ver
                break;
            case directions[3]: //right
                // move +1 ver
                break;
            default:
                break;
        }
        this.field.print();
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
function checkInput(input) {
    if (directions.includes(input)) {
        return true;
    } else if (input === 'exit') {
        console.log('Thanks for playing!');
        return false;
    } else {
        console.log('Invalid command!');
        return false;
    }
}

/* Main game */
function playGame() {
    /* Temp constant for field */
    const gameField = new Field([
        ['*', '░', 'O'],
        ['░', 'O', '░'],
        ['░', '^', '░'],
    ]);

    let exit = false;

    do {
        // ask for input (move direction or exit to quit)
        const command = prompt('Input command: ');
        
        if (checkInput(command)) {
            // after entering input print the current map and mark the tiles visited by pathCharacter
            gameField.move(command);
            // prompt for next move
        } else {
            exit = true;
        }
        // continue until: win: finding the hat, lose: landing in a hole, move outside the field
        // when any of the above happens, inform user and end the game
    } while (!exit);
}

/* Start the game */
playGame();