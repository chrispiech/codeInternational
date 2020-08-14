/*
 * Dosya: MoveDuvara.java
 * ---------------------
 * move Karel olan bir "while" döngüsünü bir duvara m
 * ove kadar kullanır. Her ölçekteki dünyada çalışıyo
 * r.
 */
import stanford.karel.*;
public class MoveDuvara extends Karel {
   public void run() {
      moveDuvara();
   }

   /* bu çok kullanışlı bir yöntem */
   private void moveDuvara() {
      while(frontIsClear()) {
         move();
      }
   } 
}