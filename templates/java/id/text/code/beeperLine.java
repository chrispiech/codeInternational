/*
 * File: JalurPager.java
 * ---------------------
 * Menggunakan loop "sementara" untuk menempatkan
 * barisan penyeranta. Program ini berfungsi untuk
 * dunia dari berbagai ukuran.
 */
import stanford.karel.*;
public class JalurPager extends Karel {
   public void run() {
   	  /* ulangi sampai karel menghadap tembok */
      while(depanJelas()) {
      	 /* tempatkan pager di kotak saat ini */ 
         masukkanBeeper();
      	 /* pindah ke alun-alun berikutnya */
         pindah();
      }
      /* memecahkan bug post pagar */
      masukkanBeeper();
   }
}