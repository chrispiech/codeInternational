/*
 * Arquivo: ColoqueMuitosBipers.java
 * ---------------------------------
 * Coloca 42 apitos usando um loop for
 */
import stanford.karel.*;
public class ColoqueMuitosBipers extends Karel {
   public void run() {
      mover();
      /* Repetir o batedor muitas vezes */
      for(int i = 0; i < 42; i++) {
      	colocarBeeper();
      }
      mover();
   } 
}