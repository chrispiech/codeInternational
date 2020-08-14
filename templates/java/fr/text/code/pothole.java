import stanford.karel.*;
public class NidDePoule extends Karel {
   public void run() {
      avancer();
      remplirLesNidsDePoule();
      avancer();
   }

   /**
    * Remplit le nid-de-poule sous la position actuelle
    * de Karel en plaçant un jeton sur ce coin. Pour que
    * cette méthode fonctionne correctement, Karel doit
    * faire face à l’est immédiatement au-dessus du nid
    * -de-poule. Lorsque l'exécution sera terminée, Kare
    * l sera revenu sur la même place et sera de nouveau
    * exposé à l'est.
    */
   private void remplirLesNidsDePoule() {
      tournerDroite();
      avancer();
      laisserJeton();
      faireDemiTour();
      avancer();
      tournerDroite();
   } 

   /** Tourne Karel à 90 degrés vers la droite. */
   public void tournerDroite() {
      tournerGauche();
      tournerGauche();
      tournerGauche();
   }

   /** Tourne Karel à environ 180 degrés. */
   public void faireDemiTour() {
      tournerGauche();
      tournerGauche();
   }
}