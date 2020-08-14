/**
 * Singleton: KarelImages
 * -----------
 * This variable is in the global scope so that all classes can 
 * use the preloaded images. As soon as the class is constructed
 * it starts fetching the necessary images.
 */
var karelImages = new KarelImages();
karelImages.loadImages();
