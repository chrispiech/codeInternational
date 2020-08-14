/*
 * File: CornerFiveBeepers.java
 * ----------------------------
 * Tempatkan lima pager di setiap sudut
 */
import stanford.karel.*;
public class CornerFiveBeepers extends Karel {

   public void run() {
      /* Ulangi sekali untuk setiap sudut */
      for(int i = 0; i < 4; i++) {
         masukkanFiveBeepers();
         pindahKePojokBerikutnya();
      }
   } 

   /* memposisikan ulang karel ke sudut berikutnya */
   public void pindahKePojokBerikutnya() {
      pindah();
      pindah();
      pindah();
      belokKiri();
   }

   /* menempatkan 5 beepers menggunakan for loop */
   public void masukkanFiveBeepers() {
      for(int i = 0; i < 5; i++) {
      	masukkanBeeper();
      }
   }
}