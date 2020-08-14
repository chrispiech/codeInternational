//This program makes Karel
//pick up any and all 
//beepers on the first row.
//It uses a while loop
//inside a while loop.
function main() {
cleanCorner();
while(frontIsClear()){
move();
cleanCorner();
}
}

function cleanCorner(){
while(beepersPresent()){
pickBeeper();
}
}