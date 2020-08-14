/*
 * File: Geometry.js
 * -----------------
 * This file defines the classes Point, Dimension, Rectangle, and
 * Direction, along with some simple tools for manipulating
 * coordinates in the DOM.
 */

/*
 * Class: Point
 * ------------
 * This class defines a Point object with x and y components.
 */

function Point(x, y) {
   this.x = x || 0;
   this.y = y || 0;
}

Point.prototype.toString = function() {
   return "(" + this.x + ", " + this.y + ")";
}

Point.prototype.getX = function() {
   return this.x;
};

Point.prototype.getY = function() {
   return this.y;
};

Point.prototype.move = function(x, y) {
   this.x = x;
   this.y = y;
};

Point.prototype.translate = function(dx, dy) {
   this.x += dx;
   this.y += dy;
};

/*
 * Class: Dimension
 * ----------------
 * Encapsulates a pair of values as height and width.
 */

function Dimension(width, height) {
   this.width = width || 0;
   this.height = height || 0;
}

Dimension.prototype.toString = function() {
   return "(" + this.width + "x" + this.height + ")";
};

Dimension.prototype.getWidth = function() {
   return this.width;
};

Dimension.prototype.getHeight = function() {
   return this.height;
};

/*
 * Class: Rectangle
 * ----------------
 * Encapsulates the bounding box of a rectangle.
 */

function Rectangle(x, y, width, height) {
   this.x = x || 0;
   this.y = y || 0;
   this.width = width || 0;
   this.height = height || 0;
}

Rectangle.prototype.toString = function() {
   return "(" + this.width + "x" + this.height +
                "@" + this.x + "," + this.y + ")";
};

Rectangle.prototype.getX = function() {
   return this.x;
};

Rectangle.prototype.getY = function() {
   return this.y;
};

Rectangle.prototype.getWidth = function() {
   return this.width;
};

Rectangle.prototype.getHeight = function() {
   return this.height;
};

Rectangle.prototype.getLocation = function() {
   return new Point(this.x, this.y);
};

Rectangle.prototype.getSize = function() {
   return new Dimension(this.width, this.height);
};

Rectangle.prototype.contains = function(x, y) {
   if (x instanceof Point) return this.contains(x.x, x.y);
   if (x instanceof Rectangle) {
      if (x.x < this.x || x.x + x.width > this.x + this.width) return false;
      if (x.y < this.y || x.y + x.height > this.y + this.height) return false;
   } else {
      if (x < this.x || x > this.x + this.width) return false;
      if (y < this.y || y > this.y + this.height) return false;
   }
   return true;
};

Rectangle.prototype.add = function(x, y) {
   if (x instanceof Point) {
      this.add(x.x, x.y);
   } else if (x instanceof Rectangle) {
      if (x.x < this.x) this.x = x.x;
      if (x.y < this.y) this.y = x.y;
      this.width = Math.max(x.x + x.width, this.x + this.width) - this.x;
      this.height = Math.max(x.y + x.height, this.y + this.height) - this.y;
   } else {
      if (x < this.x) this.x = x;
      if (y < this.y) this.y = y;
      this.width = Math.max(x, this.x + this.width) - this.x;
      this.height = Math.max(y, this.y + this.height) - this.y;
   }
};

Rectangle.prototype.translate = function(dx, dy) {
   this.x += dx;
   this.y += dy;
};

Rectangle.prototype.grow = function(dx, dy) {
   this.width += dx;
   this.height += dy;
};

Rectangle.prototype.isEmpty = function() {
   return (width <= 0 || height <= 0);
};

/*
 * Class: Direction
 * ----------------
 * This class represents a compass direction (NORTH, EAST, SOUTH, WEST).
 */

function Direction(name) {
   this.name = name || "EAST";
}

Direction.prototype.toString = function() {
   return this.name;
};

Direction.leftFrom = function(dir) {
   switch (dir) {
    case NORTH: return WEST;
    case EAST:  return NORTH;
    case SOUTH: return EAST;
    case WEST:  return SOUTH;
   }
   throw new Error("Illegal direction value " + dir);
};

Direction.rightFrom = function(dir) {
   switch (dir) {
    case NORTH: return EAST;
    case EAST:  return SOUTH;
    case SOUTH: return WEST;
    case WEST:  return NORTH;
   }
   throw new Error("Illegal direction value " + dir);
};

Direction.opposite = function(dir) {
   switch (dir) {
    case NORTH: return SOUTH;
    case EAST:  return WEST;
    case SOUTH: return NORTH;
    case WEST:  return EAST;
   }
   throw new Error("Illegal direction value " + dir);
};

Direction.prototype.leftFrom = function(dir) { Direction.leftFrom(dir); };
Direction.prototype.rightFrom = function(dir) { Direction.rightFrom(dir); };
Direction.prototype.opposite = function(dir) { Direction.opposite(dir); };

var NORTH = new Direction("NORTH");
var EAST = new Direction("EAST")
var SOUTH = new Direction("SOUTH");
var WEST = new Direction("WEST");

/* DOM functions */

/*
 * Function: getElementLocation
 * Usage: pt = getElementLocation(element);
 * ----------------------------------------
 * Returns the absolute location of the element with respect to
 * the document window.
 */

function getElementLocation(element) {
   var cx = 0;
   var cy = 0;
   while (element) {
      cx += element.offsetLeft;
      cy += element.offsetTop;
      element = element.offsetParent;
   }
   return new Point(cx, cy);
};

/*
 * Function: getElementSize
 * Usage: size = getElementSize(element);
 * --------------------------------------
 * Returns the size of the element as a Dimension object.
 */

function getElementSize(element) {
   return new Dimension(element.offsetWidth, element.offsetHeight);
};

/*
 * Function: getLocalCoordinates
 * Usage: pt = getLocalCoordinates(e, element);
 * --------------------------------------------
 * Converts the x and y coordinates in the event so that they
 * are expressed relative to the specified element.
 */

function getLocalCoordinates(e, element) {
   var px = 0;
   var py = 0;
   if (e.pageX) {
      px = e.pageX;
      py = e.pageY;
   } else if (e.clientX) {
      px = e.clientX + document.body.scrollLeft
                     + document.documentElement.scrollLeft;
      py = e.clientY + document.body.scrollTop
                     + document.documentElement.scrollTop;
   }
   var loc = getElementLocation(element);
   return new Point(px - loc.x, py - loc.y);
}
