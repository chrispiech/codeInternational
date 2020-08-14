/*
 * Faili: KonaTanoKoniS.java
 * ------------------------
 * Sehemu tano koni s kila kona
 */
import stanford.karel.*;
public class KonaTanoKoniS extends Karel {

   public void run() {
      /* Kurudia mara moja kwa kila kona */
      for(int i = 0; i < 4; i++) {
         kuwekaTanoKoniS();
         moveKwenyeKonaInayofuata();
      }
   } 

   /* Weka karel kwenye kona inayofuata */
   public void moveKwenyeKonaInayofuata() {
      move();
      move();
      move();
      geukaKushoto();
   }

   /* maeneo 5 koni s kutumia mzunguko for */
   public void kuwekaTanoKoniS() {
      for(int i = 0; i < 5; i++) {
      	wekaKoni();
      }
   }
}