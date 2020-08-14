/*
 * File: CornerFiveBeepers.java
 * -----------------------------
 * Places five beepers in each corner
 */
import stanford.karel.*;
public class CornerFiveBeepers extends Karel {

   public void run() {
      /* Repeat once for each corner */
      for(int i = 0; i < 4; i++) {
         putFiveBeepers();
         moveToTheNextCorner();
      }
   } 

   /* reposition karel to the next corner */
   public void moveToTheNextCorner() {
      move();
      move();
      move();
      turnLeft();
   }

   /* places 5 beepers using a for loop */
   public void putFiveBeepers() {
      for(int i = 0; i < 5; i++) {
      	putBeeper();
      }
   }
}