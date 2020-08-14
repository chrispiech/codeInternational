/*
 * Ficheiro: BeeperPickingKarel.java
 * ---------------------------------
 * Karel pega um bip e coloca-o em uma borda.
 */
import stanford.karel.*;
public class BeeperPickingKarel extends Karel {
   public void run() {
      mover();
      escolherBeeper();
      mover();
      vireAEsquerda();
      mover();
      vireAEsquerda();
      vireAEsquerda();
      vireAEsquerda();
      mover();
      mover();
      colocarBeeper();
      mover();
   } 
}