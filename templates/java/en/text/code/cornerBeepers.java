/*
 * File: CornerBeepers.java
 * -----------------------------
 * Places one beeper in each corner
 */
import stanford.karel.*;
public class CornerBeepers extends Karel {
   public void run() {
      /* repeat the body 4 times */
      for(int i = 0; i < 4; i++) {
      	putBeeper();
      	move();
      	move();
      	move();
      	turnLeft();
      }
   } 
}