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
            case directions[0]: //up
                if (this.playerHorPos - 1 > 0) { // check if going up is legal move
                    this.field[this.playerHorPos - 1][this.playerVerPos] = pathCharacter;
                    this.playerHorPos -= 1;
                    return true;
                } else {
                    console.log('Out of bounds!');
                    return false;
                }
            case directions[1]: //down
                if (this.playerHorPos + 1 < this.field.length) {
                    this.field[this.playerHorPos + 1][this.playerVerPos] = pathCharacter;
                    this.playerHorPos += 1;
                    return true;
                } else {
                    console.log('Out of bounds!');
                    return false;
                }
            case directions[2]: //left
                if (this.playerVerPos - 1 > 0) {
                    this.field[this.playerHorPos][this.playerVerPos - 1] = pathCharacter;
                    this.playerVerPos -= 1;
                    return true;
                } else {
                    console.log('Out of bounds!');
                    return false;
                }
            case directions[3]: //right
                if (this.playerVerPos < this.field[0].length) {
                    this.field[this.playerHorPos][this.playerVerPos + 1] = pathCharacter;
                    this.playerVerPos += 1;
                    return true;
                } else {
                    console.log('Out of bounds!');
                    return false;
                }
            default:
                console.log('Out of bounds!');
                return false;
        }
    }
    checkPosition() {
        // check if hat
        // check if hole
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
// Input checker: checks if input is good
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

    gameField.print();

    do {
        // ask for input (move direction or exit to quit)
        const command = prompt('Input command: ');
        
        if (checkInput(command)) {
            // after entering input print the current map and mark the tiles visited by pathCharacter
            if(!gameField.move(command)) {
                exit = true;
            } else {
                gameField.print();
            }
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