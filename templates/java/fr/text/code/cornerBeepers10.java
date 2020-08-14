/*
 * Fichier: CoinCinqJetons.java
 * ----------------------------
 * Place cinq jetons dans chaque coin
 */
import stanford.karel.*;
public class CoinCinqJetons extends Karel {

   public void run() {
      /* Répétez une fois pour chaque coin */
      for(int i = 0; i < 4; i++) {
         mettreCinqJetons();
         avancerAuCoinSuivant();
      }
   } 

   /* repositionner Karel au coin suivant */
   public void avancerAuCoinSuivant() {
      avancer();
      avancer();
      avancer();
      tournerGauche();
   }

   /* place 5 jetons utilisant un boucle for */
   public void mettreCinqJetons() {
      for(int i = 0; i < 5; i++) {
      	laisserJeton();
      }
   }
}