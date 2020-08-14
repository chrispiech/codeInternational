
/**
 * Class: KarelCompiledEngine
 * --------------------------
 * This class is in charge of compiling a piece of Karel
 * code into some abstraction such that it can execute 
 * the program one step at a time. Implements the same
 * interface as the karelEvalEngine.
 */
function KarelCompiledEngine(karel) {

   var that = {};

   that.compile = function(code) {
      // Fill this in. This function is called once
      // when the user hits the run button. It shouldn't
      // make calls to karel. Any error thrown will be
      // reported by the IDE.
   }

   that.executeStep = function() {
      // Execute the next action of the compiled karel program.
      // Return true if the end of the program has been reached.
      // Execute the action by making a call to the karel object.
      // The IDE will pause animation between each call to
      // executeStep.
      // If a call to a karel command fails (eg frontIsBlocked), 
      // an error will be thrown which will be caught by the IDE.
      return true;
   }

   return that;

}
