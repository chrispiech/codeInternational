/*
 * Fichier: LigneJeton.java
 * ------------------------
 * Utilise une boucle "while" pour placer une ligne d
 * e jetons . Ce programme fonctionne pour un monde d
 * e toute taille.
 */
import stanford.karel.*;
public class LigneJeton extends Karel {
   public void run() {
      /* répète jusqu'à ce que Karel soit face à un mur */
      while(devantDegage()) {
         /* placer un jeton sur le carré actuel */ 
         laisserJeton();
         /* avancer à la prochaine case */
         avancer();
      }
      /* résout le bogue de clôture */
      laisserJeton();
   }
}