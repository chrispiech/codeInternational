function ReferenceDialog() {
}

ReferenceDialog._boxy = null;

ReferenceDialog._boxyExists = function() {
   return ReferenceDialog._boxy && ReferenceDialog._boxy.isVisible();
}

ReferenceDialog.createReferenceDialog = function() {
   if (!ReferenceDialog._boxyExists()){
      ReferenceDialog._boxy = new Boxy('<div id = "reference"><img id="referenceImg" src="images/reference.png" alt="Reference" /></div>', {title:"Reference", modal:true});
      ReferenceDialog.resize();
   }
}

ReferenceDialog.resize = function(){
   if(ReferenceDialog._boxyExists()) {
      var BOXY_PERCENT = 0.8;
      var windowHeight = $(window).height() - 1;
      var windowWidth = $(window).width() - 1;
      var width  = windowWidth * BOXY_PERCENT;
      var height = windowHeight * BOXY_PERCENT;
      var size = Math.min(width, height);
      ReferenceDialog._boxy.resize(size, size);
      ReferenceDialog._boxy.centerAt(windowWidth * 0.5, windowHeight * 0.5);
   }
}

