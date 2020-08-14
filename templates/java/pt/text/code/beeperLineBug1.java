/*
 * Ficheiro: BeeperLineBug.java
 * ----------------------------
 * Usa um loop "while" para colocar uma linha de
 * beepers. Este programa funciona para um mundo de
 * qualquer tamanho. No entanto, como cada mundo
 * exige menos movimentos do que putBeepers, ele
 * sempre perde um bip.
 */
import stanford.karel.*;
public class BeeperLineBug extends Karel {
   public void run() {
   	  /* repete até que o karel enfrente uma parede */
      while(frenteÉClaro()) {
      	 /* coloque um bip na praça atual */ 
         colocarBeeper();
      	 /* passar para o próximo quadrado */
         mover();
      }
   }
}