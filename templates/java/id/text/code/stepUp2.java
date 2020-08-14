/*
 * File: PagerMemilihKarel.java
 * ----------------------------
 * Program PagerMemilihKarel mendefinisikan metode
 * "jalankan" dengan tiga perintah.
 * Perintah-perintah ini menyebabkan Karel bergerak
 * maju satu blok, mengambil pager, dan kemudian
 * bergerak maju ke sudut berikutnya.
 */
import stanford.karel.*;
public class PagerTotingKarel extends Karel {
   public void run() {
      pindah();
      pilihPager();
      pindah();
      belokKiri();
      pindah();
      belokKanan();
      pindah();
      pindah();
      masukkanBeeper();
      pindah();
   }

   /**
    * Putar Karel 90 derajat ke kanan.
    */
   private void belokKanan() {
      belokKiri();
      belokKiri();
      belokKiri();
   }
}