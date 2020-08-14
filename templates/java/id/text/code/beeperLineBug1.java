/*
 * File: BugJalurPager.java
 * ------------------------
 * Menggunakan loop "sementara" untuk menempatkan
 * barisan penyeranta. Program ini berfungsi untuk
 * dunia dari berbagai ukuran. Namun, karena
 * masing-masing dunia membutuhkan satu gerakan
 * lebih sedikit daripada putBeepers, ia selalu
 * kehilangan pager.
 */
import stanford.karel.*;
public class BugJalurPager extends Karel {
   public void run() {
   	  /* ulangi sampai karel menghadap tembok */
      while(depanJelas()) {
      	 /* tempatkan pager di kotak saat ini */ 
         masukkanBeeper();
      	 /* pindah ke alun-alun berikutnya */
         pindah();
      }
   }
}