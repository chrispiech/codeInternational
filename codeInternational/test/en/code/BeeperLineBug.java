/*
 * File: BeeperLineBug.java
 * ------------------------------
 * Uses a "while" loop to place a line of beepers.
 * This program works for a world of any size.
 * However, because each world requires one fewer
 * moves than putBeepers it always misses a beeper.
 */
import stanford.karel.*;
public class BeeperLineBug extends Karel {
   public void run() {
      /* repeats until karel faces a wall */
      while(frontIsClear()) {
         /* place a beeper on current square */ 
         putBeeper();
         /* move to the next square */
         move();
      }
   }
}