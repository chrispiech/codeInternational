/*
 * Fichier: JetonRamasserKarel.java
 * --------------------------------
 * Le programme JetonRamasserKarel définit une méthod
 * e " run " à trois commandes. Ces commandes entraîn
 * ent Karel avancer avant d'un bloc, jeton un jeton
 * , puis avancer avant jusqu'au prochain virage.
 */
import stanford.karel.*;
public class JetonRamasserKarel extends Karel {
   public void run() {
      avancer();
      ramasserJeton();
      avancer();
      tournerGauche();
      avancer();
      tournerDroite();
      avancer();
      avancer();
      laisserJeton();
      avancer();
   }

   /**
    * Tourne Karel à 90 degrés vers la droite.
    */
   private void tournerDroite() {
      tournerGauche();
      tournerGauche();
      tournerGauche();
   }
}