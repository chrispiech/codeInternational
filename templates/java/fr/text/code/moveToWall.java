/*
 * Fichier: AvancerAuMur.java
 * --------------------------
 * Utilise une boucle "while" de avancer Karel jusqu'
 * à ce qu'elle heurte un mur. Fonctionne sur n'impor
 * te quel monde de taille.
 */
import stanford.karel.*;
public class AvancerAuMur extends Karel {
   public void run() {
      avancerAuMur();
   }

   /* c'est une méthode très utile */
   private void avancerAuMur() {
      while(devantDegage()) {
         avancer();
      }
   } 
}