function ImagePreloader(images, call-back) {
	// store the call-back
	this.call-back = call-back;

	// initialize internal state.
	this.nLoaded = 0;
	this.nProcessed = 0;
	this.aImages = new Array;

	// record the number of images.
	this.nImages = images.length;
 
   	// for each image, call preload()
   	for ( var i = 0; i < images.length; i++ )
      this.preload(images[i]);
 
	function preload(image) {
	   // create new Image object and add to array
	   var oImage = new Image;
	   this.aImages.push(oImage);
	  
	   // set up event handlers for the Image object
	   oImage.onload = ImagePreloader.prototype.onload;
	   oImage.onerror = ImagePreloader.prototype.onerror;
	   oImage.onabort = ImagePreloader.prototype.onabort;
	  
	   // assign pointer back to this.
	   oImage.oImagePreloader = this;
	   oImage.bLoaded = false;
	  
	   // assign the .src property of the Image object
	   oImage.src = image;
	}

	this.onComplete = function()
	{
	   this.nProcessed++;
	   if ( this.nProcessed == this.nImages )
	   {
	      this.call-back(this.aImages, this.nLoaded);
	   }
	}

	this.onload = function() {
	   this.bLoaded = true;
	   this.oImagePreloader.nLoaded++;
	   this.oImagePreloader.onComplete();
	}

	this.onerror = function()
	{
	   this.bError = true;
	   this.oImagePreloader.onComplete();
	}

	this.onabort = function()
	{
	   this.bAbort = true;
	   this.oImagePreloader.onComplete();
	}
}
