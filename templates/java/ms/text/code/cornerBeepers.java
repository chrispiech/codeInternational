/*
 * Fail: SudutConoS.java
 * --------------------
 * Tempat satu beeper di setiap sudut
 */
import stanford.karel.*;
public class SudutConoS extends Karel {
   public void run() {
      /* ulangi badan 4 kali */
      for(int i = 0; i < 4; i++) {
      	putBeeper();
      	move();
      	move();
      	move();
      	turnLeft();
      }
   } 
}