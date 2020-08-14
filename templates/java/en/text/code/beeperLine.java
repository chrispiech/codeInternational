/*
 * File: BeeperLine.java
 * ------------------------------
 * Uses a "while" loop to place a line of beepers.
 * This program works for a world of any size.
 */
import stanford.karel.*;
public class BeeperLine extends Karel {
   public void run() {
      /* repeats until karel faces a wall */
      while(frontIsClear()) {
         /* place a beeper on current square */ 
         putBeeper();
         /* move to the next square */
         move();
      }
      /* solves the fence-post bug */
      putBeeper();
   }
}