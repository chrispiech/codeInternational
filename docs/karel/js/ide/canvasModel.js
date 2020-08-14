function CanvasModel(canvasWidth, canvasHeight) {

   var that = {};

   var cornerSize;
   var worldLeft;
   var worldTop;
   var worldWidth;
   var worldHeight;

   var worldRows;
   var worldCols;

   that.getWidth = function() {
      return canvasWidth;
   }

   that.getHeight = function() {
      return canvasHeight;
   }

   that.resizeCanvas = function(width, height, worldLoaded) {
      canvasWidth = width;
      canvasHeight = height;
      if (worldLoaded) {
         that.setKarelDimensions(worldRows, worldCols);
      }
   }

   that.setKarelDimensions = function(rows, cols) {
      cornerSize = that._calcCornerSize(rows, cols)
		worldWidth = cols * cornerSize;
		worldHeight = rows * cornerSize;

      let gutterSize = Const.GUTTER_SIZE_FRAC * cornerSize;
      centeredHeight = worldHeight + gutterSize
		worldTop = (canvasHeight - centeredHeight)/2;
		worldLeft = Const.BORDER_SIZE + gutterSize;
   }

   that._calcCornerSize = function(rows, cols) {
      let maxWorldWidth = canvasWidth - Const.BORDER_SIZE * 2;
      let maxWorldHeight = canvasHeight - Const.BORDER_SIZE * 2;
      let isWide = cols > rows
      if(isWide) {
         return maxWorldWidth / (cols + Const.GUTTER_SIZE_FRAC)
      } else {
         return maxWorldHeight / (rows + Const.GUTTER_SIZE_FRAC)
      }
   }

   that.getCornerSize = function() {
      return cornerSize;
   }

   that.getWorldLeft = function() {
      return worldLeft;
   }

   that.getWorldTop = function() {
      return worldTop;
   }

   that.getWorldWidth = function() {
      return worldWidth;
   }

   that.getWorldHeight = function() {
      return worldHeight;
   }

   return that;

}
