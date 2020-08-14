/*
 * Fungua: KoniKukusanyaKarel.java
 * ------------------------------
 * Darasa la KoniKukusanyaKarel linakusanya koni s ka
 * tika mfululizo wa minara ya wima na kuiweka kwenye
 * kona ya mashariki kwenye mstari wa 1.
 */
import stanford.karel.*;
public class KoniKukusanyaKarel extends Karel {

   /**
    * Inabainisha hatua ya kuingilia programu.
    */
   public void run() {
      kukusanyaWoteKoniS();
      toneYoteKoniS();
      kurudiNyumbani();
   }

   /**
    * koni s kutoka kila mnara kwa kusonga mstari wa kwa
    * nza, wito kukusanyaMnaraMmoja kwenye kila kona. Po
    * stcondition kwa njia hii ni kwamba Karel yuko kati
    * ka kona ya kusini ya mstari wa kwanza inakabiliwa
    * mashariki.
    */
   private void kukusanyaWoteKoniS() {
      while (frontIsClear()) {
         kukusanyaMnaraMmoja();
         move(); 
      }
      kukusanyaMnaraMmoja();
   }

   /**
    * Hukusanya koni s kwenye mnara mmoja. Wakati kukusa
    * nyaMnaraMmoja inaitwa, Karel lazima awe mstari wa
    * kwanza akielekea mashariki. Postcondition ya kukus
    * anyaMnaraMmoja ni kwamba Karel lazima awe tena kuk
    * abili mashariki kwenye kona hiyo hiyo.
    */
   private void kukusanyaMnaraMmoja() {
      geukaKushoto();
      kukusanyaMstariWaKoniS();
      turnAround();
      moveKwaUkuta();
      geukaKushoto();
   }

   /**
    * Hukusanya mstari mfululizo wa koni s. Mwisho wa ms
    * tari wa koni unaonyeshwa na kona ambayo haina koni
    * s.
    */
   private void kukusanyaMstariWaKoniS() {
      while (koniIko()) {
         chukuaKoni();
         if (frontIsClear()) {
            move(); 
         }
      } 
   }

   /**
    * koni kila koni s kwenye kona ya sasa.
    */
   private void toneYoteKoniS() {
      while (beepersInBag()) {
         wekaKoni();
      }
   }

   /**
    * Anarudi Karel kwenye nafasi yake ya kwanza kwenye
    * kona ya 1 Avenue na mstari wa kwanza, wakipata mas
    * hariki. Msingi wa njia hii ni kwamba Karel lazima
    * atakabiliwa na mashariki mahali fulani kwenye msta
    * ri wa 1, ambayo ni kweli wakati wa kumalizaKoniS k
    * ukusanya.
    */
   private void kurudiNyumbani() {
      turnAround();
      moveKwaUkuta();
      turnAround();
   }

   /** Anasababisha Karel mbele mpaka imefungwa na ukuta. */
   private void moveKwaUkuta(){
      while (frontIsClear()) {
         move();
      } 
   }

   /** Inachukua Karel 180 digrii karibu */
   private void turnAround(){
      geukaKushoto();
      geukaKushoto();
   }
}