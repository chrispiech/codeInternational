// Write your karel javascript
// code in this text area. 

function run() { 

    placeLineOfBeepers();

    while(true) {
        pickBeeper();
        turnAround();
        move();
        if (!beeperPresent())
            break;
        moveToLastBeeper();
    }
    turnAround();
    move();
    putBeeper();

    moveToWall();

}

function moveToLastBeeper() {
    while(frontIsClear() &&
          beeperPresent()) {
        move();
    }
    
    if (!beeperPresent()) {
        turnAround();
        move();
        turnAround();
    }

}

function moveToWall() {
    while(frontIsClear()) {
        move();
    }
}

function turnAround() {
    turnRight();
    turnRight();
}

function placeLineOfBeepers() {
    while(frontIsClear()) {
        putBeeper();
        move();
    }

    putBeeper();
}
