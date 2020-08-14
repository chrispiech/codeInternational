// Make Karel walk the simple 
// maze

// This function teaches Karel 
// how to turn to the right.
function turnRight() {
turnLeft();
turnLeft();
turnLeft();
}

// We can now use turnRight()
function main(){
move();
turnRight();
move();
turnRight();
move();
}