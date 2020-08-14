/*
 * Ficheiro: BeeperPickingKarel.java
 * ---------------------------------
 * O programa BeeperPickingKarel define um método
 * "run" com três comandos. Esses comandos fazem com
 * que Karel avance um bloco, pegue um bip e siga em
 * frente até o próximo canto.
 */
import stanford.karel.*;
public class BeeperTotingKarel extends Karel {
   public void run() {
      mover();
      escolherBeeper();
      mover();
      vireAEsquerda();
      mover();
      vireÀDireita();
      mover();
      mover();
      colocarBeeper();
      mover();
   }

   /**
    * Liga Karel 90 graus para a direita.
    */
   private void vireÀDireita() {
      vireAEsquerda();
      vireAEsquerda();
      vireAEsquerda();
   }
}