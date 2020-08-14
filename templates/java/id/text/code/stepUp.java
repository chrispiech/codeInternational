/*
 * File: PagerMemilihKarel.java
 * ----------------------------
 * Program PagerMemilihKarel mendefinisikan metode
 * "jalankan" dengan perintah yang menyebabkan Karel
 * mengambil pager dan meletakkannya di langkan.
 */
import stanford.karel.*;
public class PagerMemilihKarel extends Karel {
   public void run() {
      pindah();
      pilihPager();
      pindah();
      belokKiri();
      pindah();
      belokKiri();
      belokKiri();
      belokKiri();
      pindah();
      pindah();
      masukkanBeeper();
      pindah();
   } 
}