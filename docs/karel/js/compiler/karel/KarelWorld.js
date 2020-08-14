/*
 * File: KarelWorld.js
 * -------------------
 * This file contains the class that implements the model for
 * Karel's world.  All graphical of the world are managed by
 * KarelView.
 */

function KarelWorld() {
   this.init(KarelWorld.DEFAULT_WIDTH, KarelWorld.DEFAULT_HEIGHT);
   this.views = [ ];
   this.pathname = "";
}

KarelWorld.prototype.init = function(width, height) {
   this.width = width;
   this.height = height;
   this.speed = KarelWorld.DEFAULT_SPEED;
   this.karels = [ ];
   this.map = { };
   this.bagCount = 0;
   for (var x = 1; x <= this.width; x++) {
      for (var y = 1; y <= this.height; y++) {
         this.map[new Point(x, y)] = new Corner();
      }
   }
   for (x = 1; x <= this.width; x++) {
      this.setWall(new Point(x, 1), SOUTH);
      this.setWall(new Point(x, this.height), NORTH);
   }
   for (y = 1; y <= this.height; y++) {
      this.setWall(new Point(1, y), WEST);
      this.setWall(new Point(this.width, y), EAST);
   }
};

KarelWorld.prototype.addKarel = function(karel) {
   karel.world = this;
   this.karels.push(karel);
};

KarelWorld.prototype.removeKarel = function(karel) {
   for (var i = 0; i < this.karels.length; i++) {
      if (this.karels[i] === karel) {
         this.karels.splice(i, 1);
         return;
      }
   }
   karel.world = null;
};

KarelWorld.prototype.getKarel = function(index) {
   return this.karels[index || 0];
};

KarelWorld.prototype.getKarelCount = function() {
   return this.karels.length;
};

KarelWorld.prototype.addView = function(view) {
   this.views.push(view);
};

KarelWorld.prototype.removeView = function(view) {
   for (var i = 0; i < this.views.length; i++) {
      if (this.views[i] === view) {
         this.views.splice(i, 1);
         return;
      }
   }
};

KarelWorld.prototype.updateViews = function() {
   for (var i = 0; i < this.views.length; i++) {
      this.views[i].repaint();
   }
}

KarelWorld.prototype.getPathName = function() {
   return this.pathname;
};

KarelWorld.prototype.setPathName = function(pathname) {
   this.pathname = pathname;
};

KarelWorld.prototype.inBounds = function(pt) {
   return (pt.x > 0 && pt.x <= this.width && pt.y > 0 && pt.y <= this.height);
};

KarelWorld.prototype.getBeepersOnCorner = function(pt) {
   return this.map[pt].nBeepers;
};

KarelWorld.prototype.setBeepersOnCorner = function(pt, n) {
   if (n == INCREMENT) {
      if (this.map[pt].nBeepers != INFINITY) {
         this.map[pt].nBeepers++;
      }
   } else if (n == DECREMENT) {
      if (this.map[pt].nBeepers != INFINITY && this.map[pt].nBeepers != 0) {
         this.map[pt].nBeepers--;
      }
   } else {
      this.map[pt].nBeepers = n;
   }
};

KarelWorld.prototype.getCornerColor = function(pt) {
   return this.map[pt].color;
};

KarelWorld.prototype.setCornerColor = function(pt, color) {
   this.map[pt].color = color;
};

KarelWorld.prototype.checkWall = function(pt, dir) {
   return this.map[pt][dir.toString()];
};

KarelWorld.prototype.setWall = function(pt, dir, state) {
   if (state === undefined) state = true;
   var neighbor = Karel.adjacentCorner(pt, dir);
   switch (dir) {
    case NORTH:
      this.map[pt]["NORTH"] = state;
      if (this.inBounds(neighbor)) this.map[neighbor]["SOUTH"] = state;
      break;
    case EAST:
      this.map[pt]["EAST"] = state;
      if (this.inBounds(neighbor)) this.map[neighbor]["WEST"] = state;
      break;
    case SOUTH:
      this.map[pt]["SOUTH"] = state;
      if (this.inBounds(neighbor)) this.map[neighbor]["NORTH"] = state;
      break;
    case WEST:
      this.map[pt]["WEST"] = state;
      if (this.inBounds(neighbor)) this.map[neighbor]["EAST"] = state;
      break;
   }
};

KarelWorld.prototype.clearWall = function(pt, dir) {
   this.setWall(pt, dir, false);
};

KarelWorld.prototype.load = function(str) {
   alert(str);
   var scanner = new TokenScanner();
   scanner.setIgnoreWhitespaceFlag(true);
   scanner.setIgnoreCommentsFlag(true);
   scanner.setScanNumbersFlag(true);
   var input = str.toLowerCase().replace(/[\n\r]/g, ';');
   alert(input);
   scanner.setInput(input);
   while (true) {
      var token = scanner.nextToken();
      if (token == "") break;
      if (token != ";") {
         scanner.verifyToken(":");
         var cmd = token.toLowerCase() + "Command";
         if (!this[cmd]) {
            throw new Error("Illegal map file keyword \"" + token + "\"");
         }
         this[cmd](scanner);
      }
   }
};

KarelWorld.prototype.dimensionCommand = function(scanner) {
   var pt = this.scanPoint(scanner);
   scanner.verifyToken(";");
   this.init(pt.x, pt.y);
};

KarelWorld.prototype.karelCommand = function(scanner) {
   var pt = this.scanPoint(scanner);
   var dir = this.scanDirection(scanner) || EAST;
   var nBeepers = this.scanBeeperCount(scanner);
   if (nBeepers === null) nBeepers = this.bagCount;
   scanner.verifyToken(";");
   var karel = new Karel();
   karel.setLocation(pt);
   karel.setDirection(dir);
   karel.setBeepersInBag(nBeepers);
   this.addKarel(karel);
   this.lastKarel = karel;
};

KarelWorld.prototype.wallCommand = function(scanner) {
   var pt = this.scanPoint(scanner);
   var dir = this.scanDirection(scanner);
   if (!dir) throw new Error("Missing direction in wall command");
   scanner.verifyToken(";");
   this.setWall(pt, dir);
};

KarelWorld.prototype.setColorCommand = function(scanner) {
   throw new Error("Not yet implemented");
};

KarelWorld.prototype.setSpeed = function(speed) {
   this.speed = speed;
};

KarelWorld.prototype.getSpeed = function() {
   return this.speed;
};

KarelWorld.prototype.speedCommand = function(scanner) {
   var speed = parseFloat(scanner.nextToken());
   if (isNaN(speed) || speed < 0 || speed > 1) {
      throw new Error("Illegal speed value");
   }
   scanner.verifyToken(";");
   this.speed = speed;
};

KarelWorld.prototype.beeperCommand = function(scanner) {
   var pt = this.scanPoint(scanner);
   var nBeepers = this.scanBeeperCount(scanner);
   scanner.verifyToken(";");
   this.setBeepersOnCorner(pt, nBeepers || 0);
};

KarelWorld.prototype.beeperbagCommand = function(scanner) {
   this.bagCount = this.scanBeeperCount(scanner);
   scanner.verifyToken(";");
   if (this.lastKarel) this.lastKarel.setBeepersInBag(this.bagCount);
};

KarelWorld.prototype.scanPoint = function(scanner) {
   scanner.verifyToken("(");
   var token = scanner.nextToken();
   var x = parseInt(token);
   if (isNaN(x)) throw new Error(token + " is not a valid integer");
   scanner.verifyToken(",");
   token = scanner.nextToken();
   var y = parseInt(token);
   if (isNaN(y)) throw new Error(token + " is not a valid integer");
   scanner.verifyToken(")");
   return new Point(x, y);
};

KarelWorld.prototype.scanDirection = function(scanner) {
   var token = scanner.nextToken().toUpperCase();
   var dir = null;
   switch (token) {
    case "NORTH": dir = NORTH; break;
    case "EAST":  dir = EAST; break;
    case "SOUTH": dir = SOUTH; break;
    case "WEST":  dir = WEST; break;
    default: scanner.saveToken(token); break;
   }
   return dir;
};

KarelWorld.prototype.scanBeeperCount = function(scanner) {
   var token = scanner.nextToken().toUpperCase();
   var nBeepers = null;
   switch (token) {
    case "INFINITE": case "INFINITY":
      nBeepers = INFINITY;
      break;
    default:
      nBeepers = parseInt(token);
      if (isNaN(nBeepers)) {
         nBeepers = null;
         scanner.saveToken(token);
      }
   }
   return nBeepers;
};

KarelWorld.prototype.save = function() {
   var str = "Dimension: (" + this.width + ", " + this.height + ")\n";
   var pt = new Point();
   for (pt.y = 1; pt.y <= this.height; pt.y++) {
      for (pt.x = 1; pt.x <= this.width; pt.x++) {
         if (pt.y < this.height && this.checkWall(pt, NORTH)) {
            str += "Wall: " + pt + " NORTH\n";
         }
         if (pt.x < this.width && this.checkWall(pt, EAST)) {
            str += "Wall: " + pt + " EAST\n";
         }
      }
   }
   for (pt.y = 1; pt.y <= this.height; pt.y++) {
      for (pt.x = 1; pt.x <= this.width; pt.x++) {
         var nBeepers = this.getBeepersOnCorner(pt);
         if (nBeepers > 0) str += "Beeper: " + pt + " " + nBeepers + "\n";
      }
   }
   for (var i = 0; i < this.karels.length; i++) {
      var karel = this.karels[i];
      str += "Karel: " + karel.pt + " " + karel.dir + "\n";
      str += "BeeperBag: " + karel.beepersInBag + "\n";
   }
   if (this.speed != KarelWorld.DEFAULT_SPEED) {
      str += "Speed: " + this.speed.toFixed(2) + "\n";
   }
   return str;
};

KarelWorld.DEFAULT_WIDTH = 10;
KarelWorld.DEFAULT_HEIGHT = 10;
KarelWorld.DEFAULT_SPEED = 0.5;

function Corner() {
   this.nBeepers = 0;
   this.color = null;
}
