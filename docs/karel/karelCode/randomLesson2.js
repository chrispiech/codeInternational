function main() {
while(leftIsClear()) {
colorRow();
changeRow();
}
colorRow();
}

function changeRow(){
turnLeft();
move();
turnLeft();
while(frontIsClear()){
move();
}
turnLeft();
turnLeft();
}

function colorRow() {
while(frontIsClear()) {
colorSquare();
move();
}
colorSquare();
}

function colorSquare(){
if(random(0.3)){
paintCorner('green');
} else {
paintCorner('blue');
}
}