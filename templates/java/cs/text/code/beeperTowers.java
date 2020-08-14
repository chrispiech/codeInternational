/*
 * Soubor: KuzelSbíráníKarel.java
 * -----------------------------
 * Třída KuzelSbíráníKarel shromažďuje všech kuzel s
 * v řadě vertikálních věží a ukládá je na nejvýchodn
 * ějším rohu 1. řady.
 */
import stanford.karel.*;
public class KuzelSbíráníKarel extends Karel {

   /**
    * Určuje vstupní bod programu.
    */
   public void run() {
      sbíratVšechnyKuzelS();
      poklesVšechKuzelS();
      vrátitSeDomů();
   }

   /**
    * Sbírá kuzel s z každé věže pohybem po první řadě,
    * volá sbíratJednuVěž na každém rohu. Podmínkou této
    * metody je, že Karel je v nejvýchodnějším rohu 1.
    * řady směrem na východ.
    */
   private void sbíratVšechnyKuzelS() {
      while (frontIsClear()) {
         sbíratJednuVěž();
         move(); 
      }
      sbíratJednuVěž();
   }

   /**
    * Sbírá kuzel s v jediné věži. Když se říká sbíratJe
    * dnuVěž, Karel musí být na 1. řadě směrem na východ
    * . Podmínkou pro sbíratJednuVěž je, že Karel musí b
    * ýt na stejném rohu opět na východ.
    */
   private void sbíratJednuVěž() {
      turnLeft();
      kuzelLinkaKuzelS();
      turnAround();
      moveKeZdi();
      turnLeft();
   }

   /**
    * Sbírá po sobě následující řádek kuzel s. Konec řád
    * ku kuzel je označen rohem, který obsahuje ne kuzel
    * s.
    */
   private void kuzelLinkaKuzelS() {
      while (beepersPresent()) {
         pickBeeper();
         if (frontIsClear()) {
            move(); 
         }
      } 
   }

   /**
    * Kapky všech kuzel s na aktuálním rohu.
    */
   private void poklesVšechKuzelS() {
      while (beepersInBag()) {
         putBeeper();
      }
   }

   /**
    * Vrátí Karla do výchozí polohy na rohu 1. třídy a 1
    * . řady směrem na východ. Předpokladem pro tuto met
    * odu je, že Karel musí směřovat na východ někde v 1
    * . řadě, což platí na závěr sbíratVšechnyKuzelS.
    */
   private void vrátitSeDomů() {
      turnAround();
      moveKeZdi();
      turnAround();
   }

   /** Pohybuje Karlem dopředu, dokud není blokován zdí. */
   private void moveKeZdi(){
      while (frontIsClear()) {
         move();
      } 
   }

   /** Otočí Karla o 180 stupňů */
   private void turnAround(){
      turnLeft();
      turnLeft();
   }
}