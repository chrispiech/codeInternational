/*
 * Soubor: MoveKeZdi.java
 * ---------------------
 * Použije smyčku "while" na move Karel, dokud nenara
 * zí na zeď. Pracuje na jakémkoliv velkém světě.
 */
import stanford.karel.*;
public class MoveKeZdi extends Karel {
   public void run() {
      moveKeZdi();
   }

   /* je to velmi užitečná metoda */
   private void moveKeZdi() {
      while(frontIsClear()) {
         move();
      }
   } 
}