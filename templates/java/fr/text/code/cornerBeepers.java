/*
 * Fichier: CoinJetons.java
 * ------------------------
 * Place un jeton dans chaque coin
 */
import stanford.karel.*;
public class CoinJetons extends Karel {
   public void run() {
      /* répéter le corps 4 fois */
      for(int i = 0; i < 4; i++) {
      	laisserJeton();
      	avancer();
      	avancer();
      	avancer();
      	tournerGauche();
      }
   } 
}