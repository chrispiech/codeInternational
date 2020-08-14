/*
 * Fichier: JetonRamasserLeKarel.java
 * ---------------------------------
 * La classe JetonRamasserLeKarel rassemble tous les
 * jetons dans une série de tours verticales et les d
 * épose au coin le plus à l’est sur la 1ère rangée.
 */
import stanford.karel.*;
public class JetonRamasserLeKarel extends Karel {

   /**
    * Spécifie le point d'entrée du programme.
    */
   public void run() {
      collecterTousJetons();
      toutDéposerJetons();
      rentrerÀLaMaison();
   }

   /**
    * jetons le jetons de chaque tour en se déplaçant le
    * long de la première rangée, en appelant recueilli
    * rUneTour à chaque coin. La postcondition de cette
    * méthode est que Karel se trouve dans le coin le pl
    * us à l’est de la 1ère rangée face à l’est.
    */
   private void collecterTousJetons() {
      while (devantDegage()) {
         recueillirUneTour();
         avancer(); 
      }
      recueillirUneTour();
   }

   /**
    * Recueille le jetons dans une seule tour. Au moment
    * de l’appel de recueillirUneTour, Karel doit figur
    * er au premier rang face à l’est. La postcondition
    * de recueillirUneTour est que Karel doit à nouveau
    * faire face à l’est sur ce même coin.
    */
   private void recueillirUneTour() {
      tournerGauche();
      recueillirLaLigneDeJetons();
      faireDemiTour();
      avancerAuMur();
      tournerGauche();
   }

   /**
    * Collecte une ligne consécutive de jetons . La fin
    * de la ligne jeton est indiquée par un coin ne cont
    * enant pas jetons .
    */
   private void recueillirLaLigneDeJetons() {
      while (jetonsPresents()) {
         ramasserJeton();
         if (devantDegage()) {
            avancer(); 
         }
      } 
   }

   /**
    * jetons tous les jetons sur le coin en cours.
    */
   private void toutDéposerJetons() {
      while (jetonsEnPoche()) {
         laisserJeton();
      }
   }

   /**
    * Ramène Karel à sa position initiale au coin de la
    * 1ère avenue et de la 1ère rangée, face à l’est. La
    * condition préalable à cette méthode est que Karel
    * doit faire face à l’est quelque part au 1er rang,
    * ce qui est vrai à la conclusion de collecterTousJ
    * etons.
    */
   private void rentrerÀLaMaison() {
      faireDemiTour();
      avancerAuMur();
      faireDemiTour();
   }

   /** Avance Karel jusqu'à ce qu'il soit bloqué par un mur. */
   private void avancerAuMur(){
      while (devantDegage()) {
         avancer();
      } 
   }

   /** Tourne Karel à 180 degrés */
   private void faireDemiTour(){
      tournerGauche();
      tournerGauche();
   }
}