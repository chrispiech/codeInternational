/*
 * File: PlaceManyBeepers.java
 * -----------------------------
 * Places 42 beepers using a for loop
 */
import stanford.karel.*;
public class PlaceManyBeepers extends Karel {
   public void run() {
      move();
      /* repeat putBeeper many times */
      for(int i = 0; i < 42; i++) {
      	putBeeper();
      }
      move();
   } 
}