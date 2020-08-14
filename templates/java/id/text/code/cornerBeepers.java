/*
 * File: PagerSudut.java
 * ---------------------
 * Tempatkan satu pager di setiap sudut
 */
import stanford.karel.*;
public class PagerSudut extends Karel {
   public void run() {
      /* ulangi tubuh 4 kali */
      for(int i = 0; i < 4; i++) {
      	masukkanBeeper();
      	pindah();
      	pindah();
      	pindah();
      	belokKiri();
      }
   } 
}