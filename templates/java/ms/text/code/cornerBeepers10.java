/*
 * Fail: SudutLimaConoS.java
 * ------------------------
 * Tempat lima beeper s di setiap sudut
 */
import stanford.karel.*;
public class SudutLimaConoS extends Karel {

   public void run() {
      /* Ulangi sekali untuk setiap sudut */
      for(int i = 0; i < 4; i++) {
         meletakkanLimaConoS();
         moveKeSudutSeterusnya();
      }
   } 

   /* memulihkan karel ke sudut berikutnya */
   public void moveKeSudutSeterusnya() {
      move();
      move();
      move();
      turnLeft();
   }

   /* tempat 5 beeper s menggunakan gelung untuk */
   public void meletakkanLimaConoS() {
      for(int i = 0; i < 5; i++) {
      	putBeeper();
      }
   }
}