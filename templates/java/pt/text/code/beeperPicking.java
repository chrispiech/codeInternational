/*
 * Ficheiro: BeeperPickingKarel.java
 * ---------------------------------
 * O programa BeeperPickingKarel define um método
 * "run" com três comandos. Esses comandos fazem com
 * que Karel avance um bloco, pegue um bip e avance
 * para o próximo canto.
 */
import stanford.karel.*;
public class BeeperPickingKarel extends Karel {
   /* o programa começa a correr aqui */
   public void run() {
      mover();
      escolherBeeper();
      mover();
   } 
}