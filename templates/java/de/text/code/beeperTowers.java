/*
 * Datei: ConoKarelSammeln.java
 * ---------------------------
 * Die ConoKarelSammeln-Klasse sammelt alle beeper in
 * einer Reihe vertikaler Türme und legt sie an der
 * östlichsten Ecke in der 1. Reihe ab.
 */
import stanford.karel.*;
public class ConoKarelSammeln extends Karel {

   /**
    * Gibt den Programmeinstiegspunkt an.
    */
   public void run() {
      sammleAlleConoS();
      conoAlleConoS();
      nachHauseZurückkehren();
   }

   /**
    * Sammelt die beeper s von jedem Turm, indem Sie sic
    * h entlang der ersten Reihe bewegen und an jeder Ec
    * ke sammleEinenTurm aufrufen. Nachbedingung für die
    * se Methode ist, dass sich Karel in der östlichsten
    * Ecke der 1. Reihe in Richtung Osten befindet.
    */
   private void sammleAlleConoS() {
      while (frontIsClear()) {
         sammleEinenTurm();
         move(); 
      }
      sammleEinenTurm();
   }

   /**
    * Sammelt die beeper s in einem einzigen Turm. Wenn
    * sammleEinenTurm aufgerufen wird, muss sich Karel i
    * n der ersten Reihe in Richtung Osten befinden. Die
    * Nachbedingung für sammleEinenTurm ist, dass Karel
    * an derselben Ecke wieder nach Osten blicken muss.
    */
   private void sammleEinenTurm() {
      turnLeft();
      conoVonConoS();
      turnAround();
      moveAnDieWand();
      turnLeft();
   }

   /**
    * Sammelt eine fortlaufende Zeile von beeper s. Das
    * Ende der Linie beeper wird durch eine Ecke angezei
    * gt, die keine beeper enthält.
    */
   private void conoVonConoS() {
      while (beepersPresent()) {
         pickBeeper();
         if (frontIsClear()) {
            move(); 
         }
      } 
   }

   /**
    * beeper alle beeper s in der aktuellen Ecke fallen.
    */
   private void conoAlleConoS() {
      while (beepersInBag()) {
         putBeeper();
      }
   }

   /**
    * Bringt Karel in seine Ausgangsposition an der Ecke
    * der 1st Avenue und der 1. Reihe nach Osten zurück
    * . Voraussetzung für diese Methode ist, dass Karel
    * irgendwo in der ersten Reihe nach Osten zeigt, was
    * am Ende von sammleAlleConoS zutrifft.
    */
   private void nachHauseZurückkehren() {
      turnAround();
      moveAnDieWand();
      turnAround();
   }

   /** Bewegt Karel nach vorne, bis er von einer Mauer blockiert wird. */
   private void moveAnDieWand(){
      while (frontIsClear()) {
         move();
      } 
   }

   /** Dreht Karel um 180 Grad */
   private void turnAround(){
      turnLeft();
      turnLeft();
   }
}