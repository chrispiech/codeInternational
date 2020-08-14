/*
 * Soubor: MístoMnohoKuzelS.java
 * ----------------------------
 * Místa 42 kuzel s pomocí smyčky for
 */
import stanford.karel.*;
public class MístoMnohoKuzelS extends Karel {
   public void run() {
      move();
      /* opakujte putBeeper mnohokrát */
      for(int i = 0; i < 42; i++) {
      	putBeeper();
      }
      move();
   } 
}