/*
 * File: FirstKarel.java
 * -----------------------------
 * Karel picks up a beeper and places it on a ledge.
 */
import stanford.karel.*;
public class FirstKarel extends Karel {
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