/*
 * Arquivo: MoveToWall.java
 * ------------------------
 * Usa um loop "while" para mover Karel até atingir
 * uma parede. Funciona em qualquer tamanho de
 * mundo.
 */
import stanford.karel.*;
public class MoverParaADemonstraçãoDeParede extends Karel {
   public void run() {
      moverParaParede();
   }

   /* este é um método muito útil */
   private void moverParaParede() {
      while(frenteÉClaro()) {
         mover();
      }
   } 
}