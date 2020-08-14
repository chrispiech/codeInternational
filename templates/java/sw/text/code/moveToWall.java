/*
 * Funga: MoveKwaUkuta.java
 * -----------------------
 * Inatumia "wakati" kitanzi hadi move Karel mpaka in
 * apiga ukuta. Inafanya kazi kwenye ulimwengu wowote
 * wa ukubwa.
 */
import stanford.karel.*;
public class MoveKwaUkuta extends Karel {
   public void run() {
      moveKwaUkuta();
   }

   /* hii ni njia muhimu sana */
   private void moveKwaUkuta() {
      while(frontIsClear()) {
         move();
      }
   } 
}