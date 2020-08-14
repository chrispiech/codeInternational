/*
 * File: BeeperPickingKarel.java
 * -----------------------------
 * The BeeperPickingKarel program defines a "run" 
 * method with commands that cause Karel to pick up
 * a beeper and place it on a ledge.
 */
import stanford.karel.*;
public class BeeperPickingKarel extends Karel {
   public void run() {
      move();
      pickBeeper();
      move();
      turnLeft();
      move();
      turnLeft();
      turnLeft();
      turnLeft();
      move();
      move();
      putBeeper();
      move();
   } 
}