// Write your karel javascript
// code in this text area. 

function run() { 

    moveToNewspaper();
    pickBeeper();
    returnHome();

}

function turnAround() {
    turnRight();
    turnRight();
}

function moveToWall() {
    while(frontIsClear()) {
        move();
    }
}

function returnHome() {
    turnAround();
    moveToWall();
    turnRight();
    move();
    turnRight();
}

function moveToNewspaper() {
    move();
    move();
    turnRight();
    move();
    turnLeft();
    move();
}

