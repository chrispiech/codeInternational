/*
 * File: PagerMemilihKarel.java
 * ----------------------------
 * Program PagerMemilihKarel mendefinisikan metode
 * "jalankan" dengan tiga perintah.
 * Perintah-perintah ini menyebabkan Karel bergerak
 * maju satu blok, mengambil pager dan kemudian
 * bergerak maju ke sudut berikutnya.
 */
import stanford.karel.*;
public class PagerMemilihKarel extends Karel {
   /* program mulai berjalan di sini */
   public void run() {
      pindah();
      pilihPager();
      pindah();
   } 
}