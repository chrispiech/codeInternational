/*
 * Datei: MoveAnDieWand.java
 * ------------------------
 * Verwendet eine "while" -Schleife für move Karel, b
 * is es gegen eine Wand stößt. Funktioniert auf jede
 * r Weltgröße.
 */
import stanford.karel.*;
public class MoveAnDieWand extends Karel {
   public void run() {
      moveAnDieWand();
   }

   /* Dies ist eine sehr nützliche Methode */
   private void moveAnDieWand() {
      while(frontIsClear()) {
         move();
      }
   } 
}