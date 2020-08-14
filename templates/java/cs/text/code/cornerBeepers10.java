/*
 * Soubor: RohPětKuzelS.java
 * ------------------------
 * Místa pět kuzel s v každém rohu
 */
import stanford.karel.*;
public class RohPětKuzelS extends Karel {

   public void run() {
      /* Opakujte jednou pro každý roh */
      for(int i = 0; i < 4; i++) {
         dalPětKuzelS();
         moveDoDalšíhoRohu();
      }
   } 

   /* přemístěte karel do dalšího rohu */
   public void moveDoDalšíhoRohu() {
      move();
      move();
      move();
      turnLeft();
   }

   /* místa 5 kuzel s pomocí smyčky for */
   public void dalPětKuzelS() {
      for(int i = 0; i < 5; i++) {
      	putBeeper();
      }
   }
}