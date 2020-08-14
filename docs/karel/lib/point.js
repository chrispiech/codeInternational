// Circle Point	
function Point(x,y) {
	this.x = x;
	this.y = y;

	this.setX = function(x) {
		this.x = y;
	}

	this.setY = function(y) {
		this.y = y;
	}

	this.setPos = function(x, y) {
		this.x = x;
		this.y = y;	
	}
	
	this.getX = function() {
		return this.x;
	}
	
	this.getY = function() {
		return this.y;
	}

	this.distance = function(other) {
		var dx = this.x - other.getX();
		var dy = this.y - other.getY();
		return Math.sqrt(dx*dx + dy*dy);
	}
}
