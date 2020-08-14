/*
 * Fail: MoveKeDinding.java
 * -----------------------
 * Menggunakan "sementara" gelung ke move Karel sehin
 * gga ia memukul dinding. Bekerja pada mana-mana dun
 * ia bersaiz.
 */
import stanford.karel.*;
public class MoveKeDinding extends Karel {
   public void run() {
      moveKeDinding();
   }

   /* ini adalah kaedah yang sangat berguna */
   private void moveKeDinding() {
      while(frontIsClear()) {
         move();
      }
   } 
}