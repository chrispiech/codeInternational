import stanford.karel.*;
public class PotholeMengisiKarel extends Karel {
   public void run() {
      pindah();
      isiLubang();
      pindah();
   }

   /**
    * Isi lubang di bawah posisi Karel saat ini dengan
    * meletakkan pager di sudut itu. Agar metode ini
    * berfungsi dengan benar, Karel harus menghadap ke
    * timur tepat di atas lubang. Ketika eksekusi
    * selesai, Karel akan kembali ke alun-alun yang
    * sama dan akan kembali menghadap ke timur.
    */
   private void isiLubang() {
      belokKanan();
      pindah();
      masukkanBeeper();
      berputar();
      pindah();
      belokKanan();
   } 

   /** Putar Karel 90 derajat ke kanan. */
   public void belokKanan() {
      belokKiri();
      belokKiri();
      belokKiri();
   }

   /** Ternyata Karel sekitar 180 derajat. */
   public void berputar() {
      belokKiri();
      belokKiri();
   }
}