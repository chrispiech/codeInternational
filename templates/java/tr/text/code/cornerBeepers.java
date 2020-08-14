/*
 * Dosya: KöşeConoS.java
 * --------------------
 * Her köşeye bir beeper yerleştirir
 */
import stanford.karel.*;
public class KöşeConoS extends Karel {
   public void run() {
      /* vücudu 4 kez tekrarlayın */
      for(int i = 0; i < 4; i++) {
      	putBeeper();
      	move();
      	move();
      	move();
      	turnLeft();
      }
   } 
}