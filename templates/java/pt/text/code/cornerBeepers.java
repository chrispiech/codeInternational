/*
 * Ficheiro: CornerBeepers.java
 * ----------------------------
 * Coloca um bip em cada canto
 */
import stanford.karel.*;
public class BipersDeCanto extends Karel {
   public void run() {
      /* repita o corpo 4 vezes */
      for(int i = 0; i < 4; i++) {
      	colocarBeeper();
      	mover();
      	mover();
      	mover();
      	vireAEsquerda();
      }
   } 
}