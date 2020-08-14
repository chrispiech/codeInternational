/*
 * Ficheiro: BeeperPickingKarel.java
 * ---------------------------------
 * O programa BeeperPickingKarel define um método
 * "run" com comandos que fazem com que Karel pegue
 * um bip e coloque-o em uma borda.
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