/*
 * Fichier: PremierKarel.java
 * -------------------------
 * Le programme PremierKarel définit une méthode " ru
 * n " avec trois commandes. Ces commandes entraînent
 * Karel avancer avant d'un bloc, jeton un jeton pui
 * s avancer avant jusqu'au prochain virage.
 */
import stanford.karel.*;
public class PremierKarel extends Karel {
   /* le programme commence ici exécuter */
   public void run() {
      avancer();
      ramasserJeton();
      avancer();
   } 
}