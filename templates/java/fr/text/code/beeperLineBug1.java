/*
 * Fichier: JetonLigneJeton.java
 * ----------------------------
 * Utilise un boucle while pour placer une ligne de j
 * etons . Ce programme fonctionne pour un monde de t
 * oute taille. Cependant, comme chaque monde nécessi
 * te avancer moins que laisserJeton il manque toujou
 * rs un jeton .
 */
import stanford.karel.*;
public class JetonLigneJeton extends Karel {
   public void run() {
   	  /* répète jusqu'à ce que Karel soit face à un mur */
      while(devantDegage()) {
      	 /* placer un jeton sur le carré actuel */ 
         laisserJeton();
      	 /* avancer à la prochaine case */
         avancer();
      }
   }
}