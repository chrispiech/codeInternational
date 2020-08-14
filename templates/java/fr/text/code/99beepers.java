/*
 * Fichier: PlaceBeaucoupJetons.java
 * --------------------------------
 * Places 42 jetons utilisant un boucle for
 */
import stanford.karel.*;
public class PlaceBeaucoupJetons extends Karel {
   public void run() {
      avancer();
      /* répéter laisserJeton plusieurs fois */
      for(int i = 0; i < 42; i++) {
      	laisserJeton();
      }
      avancer();
   } 
}