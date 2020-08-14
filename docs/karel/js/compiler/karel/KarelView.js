/*
 * File: KarelView.js
 * ------------------
 * This file contains the class that renders the data for
 * Karel's world on the display.
 */

// TO DO:
//   I think it might be better to implement this class using a <div>
//   rather than <canvas> as the base.  Everything in it can be done
//   with images, text, or filled rectangles.  If we did so, Karel
//   should run in IE.  Also, I think it would be easier to make the
//   update faster since it wouldn't be necessary to redraw most of
//   the world.

// TO DO:
//   paintCorner is not implemented.  I need to think about how
//   colors should be represented.

function KarelView(world, id) {
   if (!id) id = "world";
   this.world = world;
   this.canvas = document.getElementById(id);
   this.canvas.width = this.canvas.offsetWidth;
   this.canvas.height = this.canvas.offsetHeight;
}

KarelView.prototype.repaint = function() {
   var canvas = this.canvas;
   var world = this.world;
   var width = canvas.offsetWidth;
   var height = canvas.offsetHeight;
   var cols = world.width;
   var rows = world.height;
   var sqSize = Math.min((width - 2) / rows, (height - 2) / cols);
   var x0 = (width - cols * sqSize) / 2;
   var y0 = (height - rows * sqSize) / 2;
   var ctx = canvas.getContext("2d");
   ctx.clearRect(0, 0, width, height);
   ctx.strokeRect(x0, y0, cols * sqSize, rows * sqSize);
   ctx.lineCap = "square";
   var pt = new Point();
   for (pt.y = 1; pt.y <= rows; pt.y++) {
      var y = y0 + (rows - pt.y) * sqSize;
      var yc = y + sqSize / 2;
      for (pt.x = 1; pt.x <= cols; pt.x++) {
         var x = x0 + pt.x * sqSize;
         var xc = x - sqSize / 2;
         ctx.beginPath();
         ctx.moveTo(xc - KarelView.TICK_FRACTION * sqSize / 2, yc);
         ctx.lineTo(xc + KarelView.TICK_FRACTION * sqSize / 2, yc);
         ctx.stroke();
         ctx.beginPath();
         ctx.moveTo(xc, yc - KarelView.TICK_FRACTION * sqSize / 2);
         ctx.lineTo(xc, yc + KarelView.TICK_FRACTION * sqSize / 2);
         ctx.stroke();
         if (pt.y < rows && world.checkWall(pt, NORTH)) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - sqSize, y);
            ctx.stroke();
         }
         if (pt.x < cols && world.checkWall(pt, EAST)) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + sqSize);
            ctx.stroke();
         }
      }
   }
   for (pt.y = 1; pt.y <= rows; pt.y++) {
      var y = y0 + (rows - pt.y + 0.5) * sqSize;
      for (pt.x = 1; pt.x <= cols; pt.x++) {
         var x = x0 + (pt.x - 0.5) * sqSize;
         var nBeepers = world.getBeepersOnCorner(pt);
         if (nBeepers > 0) {
            var label = (nBeepers == 1) ? "" : "" + nBeepers;
            this.drawBeeper(ctx, x, y, sqSize, label);
         }
      }
   }
   for (var i = 0; i < world.karels.length; i++) {
      var karel = world.karels[i];
      var x = x0 + (karel.pt.x - 0.5) * sqSize;
      var y = y0 + (rows - karel.pt.y + 0.5) * sqSize;
      this.drawKarel(ctx, x, y, sqSize, karel.dir);
   }
};

KarelView.prototype.drawBeeper = function(ctx, x, y, sqSize, label) {
   var beeperSize = sqSize * KarelView.BEEPER_FRACTION;
   var ps = round(sqSize * KarelView.BEEPER_LABEL_FRACTION);
   ps = Math.min(ps, KarelView.BEEPER_LABEL_MAX_SIZE);
   if (ps < KarelView.BEEPER_LABEL_MIN_SIZE) ps = 0;
   ctx.save();
   ctx.fillStyle = KarelView.BEEPER_FILL_COLOR;
   ctx.beginPath();
   ctx.moveTo(x - beeperSize / 2, y);
   ctx.lineTo(x, y + beeperSize / 2);
   ctx.lineTo(x + beeperSize / 2, y);
   ctx.lineTo(x, y - beeperSize / 2);
   ctx.lineTo(x - beeperSize / 2, y);
   ctx.fill();
   ctx.stroke();
   if (ps && label) {
      ctx.fillStyle = "black";
      ctx.font = ps + "pt " + KarelView.BEEPER_LABEL_FONT;
      var x0 = x - ctx.measureText(label).width / 2;
      var y0 = y + ps * KarelView.BEEPER_LABEL_DY;
      ctx.fillText(label, x0, y0);
   }
   ctx.restore();
};

KarelView.prototype.drawKarel = function(ctx, x, y, sqSize, dir) {
   var karelSize = sqSize * KarelView.KAREL_FRACTION_SMALL;
   ctx.save();
   ctx.fillStyle = "white";
   ctx.translate(x, y);
   switch (dir) {
    case NORTH: break;
    case EAST:  ctx.rotate(Math.PI / 2); break;
    case SOUTH: ctx.rotate(Math.PI); break;
    case WEST:  ctx.rotate(-Math.PI / 2); break;
   }
   ctx.beginPath();
   ctx.moveTo(-karelSize / 2, karelSize / 2);
   ctx.lineTo(-karelSize / 2, 0);
   ctx.lineTo(0, -karelSize / 2);
   ctx.lineTo(karelSize / 2, 0);
   ctx.lineTo(karelSize / 2, karelSize / 2);
   ctx.lineTo(-karelSize / 2, karelSize / 2);
   ctx.fill();
   ctx.stroke();
   ctx.restore();
};

KarelView.BEEPER_FRACTION = 0.75;
KarelView.BEEPER_FILL_COLOR = "#CCCCCC";
KarelView.BEEPER_LABEL_FRACTION = 0.2;
KarelView.BEEPER_LABEL_MIN_SIZE = 6;
KarelView.BEEPER_LABEL_MAX_SIZE = 18;
KarelView.BEEPER_LABEL_FONT = "sans-serif";
KarelView.BEEPER_LABEL_DY = 0.42;

KarelView.TICK_FRACTION = 0.1;

KarelView.KAREL_FRACTION_SMALL = 0.60;
