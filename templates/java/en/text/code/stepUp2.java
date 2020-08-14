/*
 * File: BeeperPickingKarel.java
 * -----------------------------
 * The BeeperPickingKarel program defines a "run" 
 * method with three commands. These commands cause  
 * Karel to move forward one block, pick up a beeper,  
 * and then move ahead to the next corner.
 */
import stanford.karel.*;
public class BeeperPickingKarel extends Karel {
   public void run() {
      move();
      pickBeeper();
      move();
      turnLeft();
      move();
      turnRight();
      move();
      move();
      putBeeper();
      move();
   }

   /**
    * Turns Karel 90 degrees to the right.
    */
   private void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }
}