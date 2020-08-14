/*
 * Ficheiro: BeeperLine.java
 * -------------------------
 * Usa um loop "while" para colocar uma linha de
 * beepers. Este programa funciona para um mundo de
 * qualquer tamanho.
 */
import stanford.karel.*;
public class LinhaDeSinalSonoro extends Karel {
   public void run() {
   	  /* repete até que o karel enfrente uma parede */
      while(frenteÉClaro()) {
      	 /* coloque um bip na praça atual */ 
         colocarBeeper();
      	 /* passar para o próximo quadrado */
         mover();
      }
      /* resolve o bug da cerca */
      colocarBeeper();
   }
}