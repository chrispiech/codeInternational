//Sometimes you only want to
//execute a block of code a 
//single time if a condition
//passes. This program uses
//if/else statements to make
//karel invert beepers
function main() {
invertBeeper();
while(frontIsClear()){
move();
invertBeeper();
}
}

function invertBeeper(){
if(beepersPresent()){
pickBeeper();
} else {
putBeeper();
}
}