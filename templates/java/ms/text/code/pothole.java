import stanford.karel.*;
public class PengisiKarelKarel extends Karel {
   public void run() {
      move();
      mengisiLubang();
      move();
   }

   /**
    * Mengisi lubang di bawah kedudukan semasa Karel den
    * gan meletakkan beeper pada sudut itu. Untuk kaedah
    * ini berfungsi dengan betul, Karel mesti menghadap
    * ke timur tepat di atas lubang. Apabila pelaksanaa
    * n selesai, Karel akan kembali ke dataran yang sama
    * dan akan menghadapi lagi timur.
    */
   private void mengisiLubang() {
      turnRight();
      move();
      putBeeper();
      turnAround();
      move();
      turnRight();
   } 

   /** Menghidupkan Karel 90 darjah ke kanan. */
   public void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }

   /** Menghidupkan Karel sekitar 180 darjah. */
   public void turnAround() {
      turnLeft();
      turnLeft();
   }
}