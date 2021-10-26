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
    constructor(height, width) {
        this.field = Field.generateField(height, width);
        this.playerHorPos = this.findPlayerStartPos()[0];
        this.playerVerPos = this.findPlayerStartPos()[1];
    }
    print() {
        this.field.forEach(element => {
            console.log(element.join(''));
        });
    }
    move(direction) {
        // Check to see if a legal move
        if(this.checkIfLegalMovement(direction)) {
            // Check to see if a win/lose condition has been met
            if(!this.checkIfWinLose(direction)) {
                // No win/lose, so let's move to where the user wanted to move to
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
                // Win/lose condition met
                return false;
            }
        }
    }
    checkIfWinLose(direction) {
        // Check which direction the user wants to move to
        if (direction === directions[0]) {
            // See if it's the hat
            if (this.field[this.playerHorPos - 1][this.playerVerPos] === hat) {
                console.log('You found your hat! You win!')
                return true;
            }
            // See if it's a hole
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
            // Neither hat nor hole so let's keep on moving
            return false;
        }
    }
    checkIfLegalMovement(direction) {
        // check if going up is legal move
        if (direction === directions[0]) {
            if (this.playerHorPos - 1 >= 0) {
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
            if (this.playerVerPos - 1 >= 0) {
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
    static generateField(height, width) {
        //takes supplied height and width and generates the game field
        let gField = [];
        let hatInField = false;

        for (let i = 0; i < height; i++) {
            gField[i] = [];
            for (let j = 0; j < width; j++) {
                if (i === 0 && j === 0) {
                    gField[i][j] = pathCharacter;
                } else {
                    let randNum = Math.floor(Math.random() * 100);
                    
                    // Account for chance that last element and no hat
                    if (i === height - 1 && j === width - 1 && !hatInField) {
                        gField[i][j] = hat;
                        hatInField = true;
                    } else {
                        if (randNum >= 0 && randNum <= 1 && !hatInField) {
                            gField[i][j] = hat;
                            hatInField = true;
                        } else if (randNum > 1 && randNum < 50) {
                            gField[i][j] = hole;
                        } else {
                            gField[i][j] = fieldCharacter;
                        }
                    }
                }
            }
        }

        return gField;
    }
}

/* Main game */
function playGame() {
    // Create game field
    const gameField = new Field(10, 10);

    // Print the game field once at the start of the game
    gameField.print();

    /* Game loop */
    let exit = false;
    do {
        const command = prompt('Input command: ');
        
        // Check if direction is allowed, else see if it's the 'exit' command, else inform user of invalid command
        if (directions.includes(command)) {
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