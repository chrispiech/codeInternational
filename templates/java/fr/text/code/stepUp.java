/*
 * Fichier: JetonRamasserKarel.java
 * --------------------------------
 * Le programme JetonRamasserKarel définit une méthod
 * e " run " avec des commandes permettant à Karel de
 * prendre un jeton et de le placer sur un rebord.
 */
import stanford.karel.*;
public class JetonRamasserKarel extends Karel {
   public void run() {
      avancer();
      ramasserJeton();
      avancer();
      tournerGauche();
      avancer();
      tournerGauche();
      tournerGauche();
      tournerGauche();
      avancer();
      avancer();
      laisserJeton();
      avancer();
   } 
}