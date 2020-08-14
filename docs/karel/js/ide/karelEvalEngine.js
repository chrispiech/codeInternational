
/**
 * Class: KarelCompiledEngine
 * --------------------------
 * This compiles a piece of Karel code by running it
 * in an eval statement which runs the users Karel program
 * against a deep copy of the karel model and builds up a
 * buffer of Karel actions that should be performed to animate
 * the program. Implements the same interface as the 
 * karelCompiledEngine.
 */
function KarelEvalEngine(karel) {

   var that = {};

   // Enumeration of the different Karel Commands
   var MOVE = 0;
   var TURN_LEFT = 1;
   var TURN_RIGHT = 2;
   var PUT_BEEPER = 3;
   var PICK_BEEPER = 4;
   var PAINT_CORNER = 5;

   // The max size of the action buffer
   var MAX_ACTIONS = 10000;

   // Instance variables
   var actionBuffer, actionIndex;
   var virtualKarelModel = null;

   /**
    * Function: Compile
    * -----------------
    * Makes a deep copy of the karel model and then
    * evals the given code. The eval should make
    * calls to the karel functions defined bellow which
    * will update the virtualKarelModel. Throws an error
    * if the eval fails (which is caught by the IDE). If 
    * an infinite loop exists doesn't animate.
    */
   that.compile = function(code) {
      virtualKarelModel = karel.getModel().deepCopy();
      actionBuffer = new Array();
      actionIndex = 0;
      eval(code);
   }

   /**
    * Function: Execute Step
    * ----------------------
    * Executes the next action in the actionBuffer (which is populated
    * when compile is called). Returns true if the end of the program
    * has been reached.
    */
   that.executeStep = function() {
   
      if (actionIndex >= actionBuffer.length || actionIndex == -1) {
         return true;
      }

      var action = actionBuffer[actionIndex];
      var actionId = action.getId();
      actionIndex = actionIndex + 1;      

      switch(actionId) {
         case MOVE: karel.move(); break;
         case TURN_LEFT: karel.turnLeft(); break;
         case TURN_RIGHT: karel.turnRight(); break;
         case PUT_BEEPER: karel.putBeeper(); break;
         case PICK_BEEPER: karel.pickBeeper(); break;
         case PAINT_CORNER: karel.paintCorner(action.getParam()); break;
         default: alert("invalid action"); break;
      }

      return false;
   }

   /**
    * Function: Add To Action Buffer
    * ------------------------------
    * Pushes an action into the action buffer. Throws an 
    * error if the action buffer is full.
    */
   function addToActionBuffer(action) {
      if (actionBuffer.length > MAX_ACTIONS) {
         throw("infinite loop");
      }
      actionBuffer.push(action);
   }


   /**
    * Functions: Karel Commands
    * -------------------------
    * By placing these commands into the scope of the evalEngine,
    * all karel calls that are processed in the eval will map
    * to these functions. The karel commands update the virual
    * model and the action buffer so that karel can be animated
    * later and the state of the world can be tracked.
    */
    
   //--------------- Karel Commands ----------------------//

   function turnRight() {
      virtualKarelModel.turnRight();
      addToActionBuffer(new Action(TURN_RIGHT, null));
   }

   function turnAround() {
      turnLeft();
      turnLeft();
   }
   
   function random(chance) {
      var p = chance;
      if(p == undefined) p = 0.5;
      return Math.random() < p;
   }

   function paintCorner(color) {
      addToActionBuffer(new Action(PAINT_CORNER, color));
      virtualKarelModel.paintCorner(color);
   }

   function move() {
      addToActionBuffer(new Action(MOVE, null));
      try {
         virtualKarelModel.move();
      } catch(err){}
   }

   function turnLeft() {
      addToActionBuffer(new Action(TURN_LEFT, null));
      virtualKarelModel.turnLeft();
   }

   function frontIsClear() {
      return virtualKarelModel.frontIsClear();
   }

   function frontIsBlocked() {
      return !virtualKarelModel.frontIsClear();
   }

   function putBeeper() {
      addToActionBuffer(new Action(PUT_BEEPER, null));
      virtualKarelModel.putBeeper();
   }

   function pickBeeper() {
      addToActionBuffer(new Action(PICK_BEEPER, null));
      try {
         virtualKarelModel.pickBeeper();
      } catch(err) {}
   }

   function beepersPresent() {
      return virtualKarelModel.beeperPresent();
   }

   function noBeepersPresent() {
      return !virtualKarelModel.beeperPresent();
   }

   function leftIsClear() {
      return virtualKarelModel.leftIsClear();   
   }

   function leftIsBlocked() {
      return !virtualKarelModel.leftIsClear();   
   }

   function rightIsClear() {
      return virtualKarelModel.rightIsClear();   
   }

   function rightIsBlocked() {
      return !virtualKarelModel.rightIsClear();   
   }

   function facingEast() {
      return virtualKarelModel.facingEast();
   }

   function notFacingEast() {
      return !virtualKarelModel.facingEast();
   }

   function facingWest() {
      return virtualKarelModel.facingWest();
   }

   function notFacingWest() {
      return !virtualKarelModel.facingWest();
   }

   function facingNorth() {
      return virtualKarelModel.facingNorth();
   }

   function notFacingNorth() {
      return !virtualKarelModel.facingNorth();
   }

   function facingSouth() {
      return virtualKarelModel.facingSouth();
   }

   function notFacingSouth() {
      return !virtualKarelModel.facingSouth();
   }

   return that;

}
