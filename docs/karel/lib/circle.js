

// Circle Class	
function Circle(x,y,r) {
	this.pos = new Point(x, y);
	this.r = r;
	
	this.draw = function() {
		context.beginPath();
		context.fillStyle = "#000";
		context.arc(this.pos.getX(), this.pos.getY(), this.r, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
	}

	this.contains = function(point) {
		var dist = this.pos.distance(point);
		return dist <= r;
	}

	this.setPos = function(x, y) {
		this.pos.setPos(x, y);	
	}
	
	this.getX = function() {
		return this.pos.getX();
	}
	
	this.getY = function() {
		return this.pos.getY();
	}
}
