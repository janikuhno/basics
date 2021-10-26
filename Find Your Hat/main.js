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
        if(this.checkIfLegalMovement(direction)) {
            if(!this.checkIfWinLose(direction)) {
                switch (direction) {
                    case directions[0]: //up
                        this.field[this.playerHorPos - 1][this.playerVerPos] = pathCharacter;
                        this.playerHorPos -= 1;
                        return true;
                    case directions[1]: //down
                        this.field[this.playerHorPos + 1][this.playerVerPos] = pathCharacter;
                        this.playerHorPos += 1;
                        return true;
                    case directions[2]: //left
                        this.field[this.playerHorPos][this.playerVerPos - 1] = pathCharacter;
                        this.playerVerPos -= 1;
                        return true;
                    case directions[3]: //right
                        this.field[this.playerHorPos][this.playerVerPos + 1] = pathCharacter;
                        this.playerVerPos += 1;
                        return true;
                }
            } else {
                return false;
            }
        }
    }
    checkIfWinLose(direction) {
        if (direction === directions[0]) {
            if (this.field[this.playerHorPos - 1][this.playerVerPos] === hat) {
                console.log('You found your hat! You win!')
                return true;
            }
            if (this.field[this.playerHorPos - 1][this.playerVerPos] === hole) {
                console.log('You fell in a hole! Game over...');
                return true;
            }
        } else if (direction === directions[1]) {
            if (this.field[this.playerHorPos + 1][this.playerVerPos] === hat) {
                console.log('You found your hat! You win!')
                return true;
            }
            if (this.field[this.playerHorPos + 1][this.playerVerPos] === hole) {
                console.log('You fell in a hole! Game over...');
                return true;
            }
        } else if (direction === directions[2]) {
            if (this.field[this.playerHorPos][this.playerVerPos - 1] === hat) {
                console.log('You found your hat! You win!')
                return true;
            }
            if (this.field[this.playerHorPos][this.playerVerPos - 1] === hole) {
                console.log('You fell in a hole! Game over...');
                return true;
            }
        } else if (direction === directions[3]) {
            if (this.field[this.playerHorPos][this.playerVerPos + 1] === hat) {
                console.log('You found your hat! You win!')
                return true;
            }
            if (this.field[this.playerHorPos][this.playerVerPos + 1] === hole) {
                console.log('You fell in a hole! Game over...');
                return true;
            }
        } else {
            return false;
        }
    }
    checkIfLegalMovement(direction) {
        // check if going up is legal move
        if (direction === directions[0]) {
            if (this.playerHorPos - 1 > 0) {
                return true;
            } else {
                console.log('Out of bounds!');
                return false;
            }
        }
        // check if going down is a legal move
        if (direction === directions[1]) {
            if (this.playerHorPos + 1 < this.field.length) {
                return true;
            } else {
                console.log('Out of bounds!');
                return false;
            }
        }
        // check if going left is a legal move
        if (direction === directions[2]) {
            if (this.playerVerPos - 1 > 0) {
                return true;
            } else {
                console.log('Out of bounds!');
                return false;
            }
        }
        // check if going right is a legal move
        if (direction === directions[3]) {
            if (this.playerVerPos < this.field[0].length) {
                return true;
            } else {
                console.log('Out of bounds!');
                return false;
            }
        }
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
        
        if (directions.includes(command)) {
            // after entering input print the current map and mark the tiles visited by pathCharacter
            if(gameField.move(command)) {
                gameField.print();
            } else {
                exit = true;
            }
        } else if (command === 'exit') {
            console.log('Thanks for playing!');
            exit = true;
        } else {
            console.log('Invalid command!');
        }
    } while (!exit);
}

/* Start the game */
playGame();