/*
 * Archivo: ColoqueMuchosBeepers.java
 * ----------------------------------
 * Coloca 42 beepers usando un bucle para
 */
import stanford.karel.*;
public class ColoqueMuchosBeepers extends Karel {
   public void run() {
      moverse();
      /* repite ponerBeeper muchas veces */
      for(int i = 0; i < 42; i++) {
      	ponerBeeper();
      }
      moverse();
   } 
}