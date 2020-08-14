

/**
 * Class: Karel IDE
 * ---------
 * This is the main class for the Karel Ide. It provides the 
 * API availible to manipulate Karel. This class is in charge
 * of maintaining the karelImages singleton and making sure
 * that Karel doesn't try to render before images have been
 * loaded.
 */
function KarelIde(programLang="java", editor, canvas, initialWorld, speed = 0.5, lang="es", canvasWidth = 1000, canvasHeight=1000) {

  let PATH_TO_ROOT = '../../'

   function calcHeartbeatsForSpeed(speed) {
    zeroHb = 80;
    oneHb = 0;
    if(speed < 0.0 || speed >= 1.0) console.error('speed out of range', speed)
    return parseInt((1 - speed) * zeroHb)
   }


   // I am using the class style described in JavaScript the good parts
   var that = {};

   // constants
   var ACTION_HEARTBEATS = calcHeartbeatsForSpeed(speed);
   var DRAW_HEARTBEAT = ACTION_HEARTBEATS;
   var HEART_BEAT = 10;	
   var REFRESH_HEARTBEATS = 100;
   var COOKIE_NAME = 'karelCode';


   // instance variables
   if (canvas)var context = canvas.getContext('2d');
   var actionCountdown = ACTION_HEARTBEATS;
   var refreshCountdown = REFRESH_HEARTBEATS;
   var worldName = initialWorld;
   var canvasModel = CanvasModel(canvasWidth, canvasHeight);
   var worldLoaded = false;

   var karel = Karel(canvasModel, programLang, lang);
   var compileEngine = null;

   // state flags
   var animating = false;
   var imagesReady = false;
   var numActions = 0;
   var silent = false;


   /**
    * Function: Init
    * --------------
    * Setup the variables, create a animation callback loop
    * and load images.
    */ 
   function init() {
      if (canvas) {
         canvas.width = canvasModel.getWidth();
         canvas.height = canvasModel.getHeight();
      }
      if (!karelImages.haveCalledLoadImages()) {
         karelImages.loadImages(imagesLoaded);
      } else if (!karelImages.haveLoadedAllImages()) {
         karelImages.addListener(imagesLoaded);
      } else {
         imagesLoaded();
      }
      setInterval(heartbeat, HEART_BEAT);	
   }

   //--------------- PUBLIC METHODS ---------------------//

   /**
    * Function: Stop Button
    * Usage: $('#stopButton').click(karelIde.stopButton);
    * ---------------------
    * Public method that stops animation and resets the current world.
    */
   that.stopButton = function() {
      animating = false;
      loadWorld(worldName);
      editor.moveCursorTo(0);
   }

   that.resizeCanvas = function(width, height) {
      // beware! Do not try to change the canvas width
      // that is simply the size that is rendered to, not the
      // size that is displayed. The display size comes from
      // the 
   }

   /**
    * Function: Play Button
    * Usage: $('#playButton').click(karelIde.playButton);
    * --------------
    * Runs the code from the IDE editor without reseting Karel's world.
    * "Compiles" the code and then sets the animation
    * flag to be true so that the program starts rendering Karel's progress.
    * Should be called when the play button is pressed.
    */
   that.playButton = function (playCallback) {
      that.runCode(playCallback);
   }

   /**
    * Function: Change World
    * ------------
    * Sets the world to be the given fileName. Assumes that the fileName given
    * exists (doesn't do any checking).
    */
   that.changeWorld = function(fileName) {
      animating = false;
      editor.moveCursorTo(0);
      worldName = fileName;
      if (imagesReady) {
         loadWorld(fileName);
      }
   }

   /**
    * Function: Step Move Karel
    * ---------------
    * Make Karel take a single step forward.
    */
   that.stepMove = function() {
      step(karel.move);
   }

   /**
    * Step Turn Left Karel
    * ---------------
    * Make Karel turn left once.
    */
   that.stepTurnLeft = function() {
      step(karel.turnLeft);
   }

   /**
    * Function: Step Turn Right Karel
    * ---------------
    * Make Karel turn right once.
    */
   that.stepTurnRight = function() {
      step(karel.turnRight);
   }

   /**
    * Step Put Beeper Karel
    * ---------------
    * Make Karel place a single beeper.
    */
   that.stepPutBeeper = function() {
      step(karel.putBeeper);
   }

   /**
    * Function: Step Pick Beeper Karel
    * ---------------
    * Make Karel pick up a single beeper.
    */
   that.stepPickBeeper = function() {
      step(karel.pickBeeper);
   }

   /**
    * Function: Get Model
    * -------------------
    * Returns the model of karel used by this ide
    */
    that.getModel = function() {
      return karel.getModel();
    }

    that.setCode = function(code) {
      if (editor == null) return null;
      return editor.getSession().setValue(code);
    }

    that.getCode = function() {
      return getCode();
    }

    that.setSilent = function(newSilent) {
      silent = newSilent;
    }

    that.runUnitTest = function(inputWorld, outputWorld, callback) {
       var tempIde1 = KarelIde(editor, null, inputWorld);
       var tempIde2 = KarelIde(editor, null, outputWorld);
       var simulationOver = function(error) {
         var passed = tempIde1.getModel().equals(tempIde2.getModel());
         callback(passed && !error);
       }
       tempIde1.setSilent(true);
       tempIde1.runCode(simulationOver);
    }

    that.runSpecificCode = function(code, finishedCallback) {
      // setup
      compileEngine = getCompiler();
      that.stopButton();

      // compile
      try {
         compileEngine.compile(code);
      } catch (compilerError) {
         if (!silent) {
            _errorAlert(compilerError);
         }
         finishedCallback(true);
         return;
      }

      // run the code!
      if(silent) {
         return runCodeNoDisplay(finishedCallback);
      } else {
        console.log('running...')
        that.playCallback = finishedCallback;
        animating = true;
      }
    }

    that.runCode = function(finishedCallback) {
      if (!worldLoaded) throw new Error('TRIED TO RUN BEFORE WORLD LOADED');
      var code = getCode();
      that.runSpecificCode(code, finishedCallback)
      
   }

   


   //----------------------------- PRIVATE METHODS --------------------------//

   function runCodeNoDisplay(finishedCallback) {
      try {
         while(true) {
            var result = compileEngine.executeStep();
            if(result['isDone']) {
               if(finishedCallback) finishedCallback(false);
               break;
            }
         }      
      } catch (karelError) {
         if(finishedCallback) finishedCallback(true);
      }
   }

   function getCompiler() {
       if (Const.USE_COMPILER) {
        if(programLang == 'python') {
          return KarelPythonCompiler(karel)
        } 
        // default to Java
        return KarelJavaCompiler(karel);
      }
       return KarelEvalEngine(karel);
    }

   /**
    * Function: Step
    * ----
    * Make karel execute a single action (the passed in stepFunction).
    * Clears karel of any errors and turns on animation so that karel will
    * animate the action.
    */
   function step(stepFunction) {
      try {
         stepFunction();
      } catch (msg) {
         _errorAlert(msg);
      }
      draw();
   }

   /**
    * Function: ImagesLoaded
    * ------------
    * This method is the callback for when images have finished loading. 
    * Updates the imagesReady flag and loads the current world.
    * Usage: karelImages.loadImages(imagesLoaded);
    */
   function imagesLoaded() {
      imagesReady = true;
      loadWorld(worldName);
   }

   /**
    * Function: WorldFileLoaded
    * ------------
    * This method is the callback for when a world has finished loading. 
    * Updates the karelWorld instance and redraws the canvas.
    * Usage: loadDoc(worldUrl, worldFileLoaded);
    */
   function worldFileLoaded(text) {	
      karel.loadWorld(text, canvasModel);
      draw();
      worldLoaded = true;
   }

   /**
    * Funciton: Load World
    * ----------
    * Loads a new Karel World. Assumes that images have already been
    * preloaded.
    */
   function loadWorld(worldName) {
      worldName += '.w'
      if (!imagesReady) {
         alert('load world called before images ready');
      }
      if (worldName == '15x15.w') {
         worldFileLoaded('Dimension: (15,15)');
      } else if (worldName == '7x7.w') {
         worldFileLoaded('Dimension: (7,7)');
      }else {
         var url = PATH_TO_ROOT + "/karel/worlds/" + worldName;
         loadDoc(url, worldFileLoaded);
      }
   }

   /**
    * Function: Heartbeat
    * ---------
    * Animation callback method which is executed once every HEART_BEAT
    * milliseconds. Only updates and draws if the animating flag is true
    */
   function heartbeat() {
      if (animating) {;
         update();
         if(actionCountdown== DRAW_HEARTBEAT) {
           draw();
        }
      }
   }

   /**
    * Function: Update
    * ------
    * Updates the world once every ACTION_HEATRTBEATS number of heartbeats.
    */
   function update() {
      actionCountdown = actionCountdown - 1;
      if (actionCountdown == 0 ) {
         try {
            result = compileEngine.executeStep();
            let isDone = result['isDone']
            animating = !isDone
            if(isDone && that.playCallback) that.playCallback(false);
            if(!isDone) {
              let lineNum = result['lineNumber']
              if(lineNum) {
                // if there is a selection things get funky
                editor.clearSelection();
                editor.moveCursorTo(lineNum)
              }
            }
            numActions += 1;
         } catch (karelError) {
            if (!silent) {
               _errorAlert(karelError);
            }
            animating = false;
            numActions = 0;
            if(that.playCallback) that.playCallback(true);
         }
         actionCountdown = ACTION_HEARTBEATS;
      }
   }

   /**
    * Function: Draw
    * ----
    * Clears the canvas and draws a new version of Karel. Assumes that a
    * world has been loaded. Draws Karel infront of beepers but behind walls.
    */
   function draw() {
      if (canvas) {
         clear();
         karel.draw(context);
      }
   }

   /**
    * Function: Clear
    * -----
    * Clears the canvas by filling it with a rectangle colored BACKGROUND_COLOR
    */
   function clear() {
      context.clearRect (0, 0, canvasModel.getWidth(), canvasModel.getHeight());
      //context.fillStyle = Const.BACKGROUND_COLOR;
     // context.fillRect(0, 0, canvasModel.getWidth(), canvasModel.getHeight());
   }

   /**
    * Function: Get Code
    * -----
    * Returns the code in the Karel IDE as a String.
    */
   function getCode() {
      if (editor == null) return null;
      return editor.getSession().getValue();
   }

   function _errorAlert(msg) {
    swal({
        text: msg,
        type: 'error',
        confirmButtonText: 'Ok',
    });
   }

   // Initialize and return the instance (based on JavaScript the
   // Good Parts)
   init();
   return that;
}

