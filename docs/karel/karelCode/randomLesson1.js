//Karel knows a condition "random" 
//that returns yes half of the time!
function main() {
for(var i = 0; i < 100; i++){
if(random()) {
turnLeft();
} else {
safeMove();
}
}
}

function safeMove() {
if(frontIsClear()){
move();
}
}