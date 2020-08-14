//Karel tried to put a line
//of beepers but missed the
//first one. Help!
function main() {
putBeeperLine();
}

function putBeeperLine(){
while(frontIsClear()) {
move();
putBeeper();
}
}