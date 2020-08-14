// Circle Image	
function Image(x,y) {
	this.pos = new Point(x, y);
	this.r = r;
	
	this.draw = function(c) {
		c.beginPath();
		c.fillStyle = "#000";
		c.arc(this.pos.getX(), this.pos.getY(), this.r, 0, Math.PI*2, true);
		c.closePath();
		c.fill();
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
