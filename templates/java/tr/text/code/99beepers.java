/*
 * Dosya: ÇeşitliConoSYerleştirin.java
 * ----------------------------------
 * Bir for döngüsü kullanarak 42 beeper s kullanır
 */
import stanford.karel.*;
public class BirçokConoSYerleştirin extends Karel {
   public void run() {
      move();
      /* putBeeper birçok kez tekrarlayın */
      for(int i = 0; i < 42; i++) {
      	putBeeper();
      }
      move();
   } 
}