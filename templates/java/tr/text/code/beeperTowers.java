/*
 * Dosya: ConoTopluyor.java
 * -----------------------
 * ConoTopluyor sınıfı tüm beeper bir dizi dikey kule
 * de toplar ve onları ilk sıradaki en doğu köşesine
 * yerleştirir.
 */
import stanford.karel.*;
public class ConoTopluyor extends Karel {

   /**
    * Programın giriş noktasını belirtir.
    */
   public void run() {
      conoSCono();
      conoS'NinTamamınıBırak();
      eveDön();
   }

   /**
    * Her köşede birKuleTopla çağırarak, 1. sıra boyunca
    * hareket ederek her kuleden beeper s toplar. Bu yö
    * ntemin son şartı Karel'in, ilk sıranın doğudaki kö
    * şesinde doğuya bakmasıdır.
    */
   private void conoSCono() {
      while (frontIsClear()) {
         birKuleTopla();
         move(); 
      }
      birKuleTopla();
   }

   /**
    * beeper tek bir kulede toplar. BirKuleTopla arandığ
    * ında, Karel doğuya bakan 1. sırada olmalıdır. BirK
    * uleTopla'nın son şartı, Karel'in yine aynı köşede
    * doğuya bakması gerektiğidir.
    */
   private void birKuleTopla() {
      turnLeft();
      conoSSatırToplamak();
      turnAround();
      moveDuvara();
      turnLeft();
   }

   /**
    * beeper arda beeper s'lik bir çizgi toplar. beeper
    * satırının sonu, beeper sn içermeyen bir köşe ile g
    * österilir.
    */
   private void conoSSatırToplamak() {
      while (beepersPresent()) {
         pickBeeper();
         if (frontIsClear()) {
            move(); 
         }
      } 
   }

   /**
    * Geçerli köşedeki tüm beeper .
    */
   private void conoS'NinTamamınıBırak() {
      while (beepersInBag()) {
         putBeeper();
      }
   }

   /**
    * Doğu yönüne bakan Karel'i 1. Cadde ve 1. sıra köşe
    * sinde başlangıç pozisyonuna getirir. Bu yöntemin ö
    * nkoşulu, Karel'in, conoSCono'nun sonuçlarında doğr
    * u olan, 1. sırada bir yere doğuya bakması gerektiğ
    * idir.
    */
   private void eveDön() {
      turnAround();
      moveDuvara();
      turnAround();
   }

   /** Karel'i bir duvarla engellenene kadar ileri götürür. */
   private void moveDuvara(){
      while (frontIsClear()) {
         move();
      } 
   }

   /** Karel'i 180 derece döndürür */
   private void turnAround(){
      turnLeft();
      turnLeft();
   }
}