
// Walls class	
function Walls(rows, cols) {

   var that = {};

	that.topWalls = new Array();
	for (var i = 0; i < rows; i++) {
		that.topWalls[i] = new Array();
		for (var j = 0; j < cols; j++) {
			that.topWalls[i][j] = 0;
		}
	}

	that.rightWalls = new Array();
	for (var i = 0; i < rows; i++) {
		that.rightWalls[i] = new Array();
		for (var j = 0; j < cols; j++) {
			that.rightWalls[i][j] = 0;
		}
	}

	that.addTopWall = function(r, c) {
		that.topWalls[r][c] = 1;
	}

	that.addRightWall = function(r, c) {
		that.rightWalls[r][c] = 1;
	}

	that.rightWall = function(r, c) {
		return that.rightWalls[r][c] != 0;
	}

	that.topWall = function(r, c) {
	   
		return that.topWalls[r][c] != 0;
	}

	that.isMoveValid = function(startR, startC, endR, endC) {
	   if(endC < 0 || endC >= cols) return false;
		if(endR < 0 || endR >= rows) return false;

		var dRow = Math.abs(endR - startR);
		var dCol = Math.abs(endC - startC);
		if (dRow + dCol != 1) return false; 
		
		if(startC + 1 == endC && that.rightWalls[startR][startC]) return false;
		if(startC - 1 == endC && that.rightWalls[endR][endC]) return false;

		if(startR + 1 == endR && that.topWalls[endR][endC]) return false;
		if(startR - 1 == endR && that.topWalls[startR][endC]) return false;

		return true;
	}

	that.deepCopy = function() {
      var newModel = Walls(rows, cols);
      newModel.rightWalls = deepCopyUtil(that.rightWalls);
      newModel.topWalls = deepCopyUtil(that.topWalls);
      return newModel;
	}

	return that;

}
