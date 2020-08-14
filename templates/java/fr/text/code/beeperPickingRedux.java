/*
 * Fichier: PremierKarel.java
 * -------------------------
 * Karel prend un jeton et le place sur un rebord.
 */
import stanford.karel.*;
public class PremierKarel extends Karel {
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