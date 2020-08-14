//Make Karel fill the world
//with beepers
function main() {
//your code here
}

function putBeeperLine(){
putBeeper();
while(frontIsClear()) {
move();
putBeeper();
}
}