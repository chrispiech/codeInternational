/*
 * Fail: ConoMengumpulKarel.java
 * ----------------------------
 * Kelas ConoMengumpulKarel mengumpul semua beeper s
 * dalam satu siri menara menegak dan mendepositkan m
 * ereka di sudut paling timur pada baris 1.
 */
import stanford.karel.*;
public class ConoMengumpulKarel extends Karel {

   /**
    * Menentukan titik masuk program.
    */
   public void run() {
      kumpulkanSemuaConoS();
      dropSemuaConoS();
      pulangKeRumah();
   }

   /**
    * Kumpulkan beeper s dari setiap menara dengan berge
    * rak sepanjang baris 1, memanggil MengumpulSatuMena
    * ra di setiap sudut. Poskondition untuk kaedah ini
    * adalah bahawa Karel berada di sudut paling timur b
    * aris 1 menghadap ke timur.
    */
   private void kumpulkanSemuaConoS() {
      while (frontIsClear()) {
         mengumpulSatuMenara();
         move(); 
      }
      mengumpulSatuMenara();
   }

   /**
    * Kumpulkan beeper s dalam satu menara. Apabila meng
    * umpulSatuMenara dipanggil, Karel mesti berada pada
    * baris 1 menghadap ke timur. Poskondisi untuk meng
    * umpulSatuMenara ialah Karel mesti lagi menghadap k
    * e timur pada sudut yang sama.
    */
   private void mengumpulSatuMenara() {
      turnLeft();
      mengumpulBarisConoS();
      turnAround();
      moveKeDinding();
      turnLeft();
   }

   /**
    * Mengumpul baris berturut-turut beeper s. beeper ba
    * ris beeper ditunjukkan oleh sudut yang tidak menga
    * ndungi beeper s.
    */
   private void mengumpulBarisConoS() {
      while (beepersPresent()) {
         pickBeeper();
         if (frontIsClear()) {
            move(); 
         }
      } 
   }

   /**
    * beeper semua beeper s pada sudut semasa.
    */
   private void dropSemuaConoS() {
      while (beepersInBag()) {
         putBeeper();
      }
   }

   /**
    * Mengembalikan Karel ke kedudukan awalnya di sudut
    * 1st Avenue dan baris 1, menghadap ke timur. Prekon
    * disi untuk kaedah ini adalah bahawa Karel mesti me
    * nghadap ke timur di suatu tempat pada baris 1, yan
    * g benar pada kesimpulan kumpulkanSemuaConoS.
    */
   private void pulangKeRumah() {
      turnAround();
      moveKeDinding();
      turnAround();
   }

   /** Bergerak Karel ke hadapan sehingga ia disekat oleh dinding. */
   private void moveKeDinding(){
      while (frontIsClear()) {
         move();
      } 
   }

   /** Menghidupkan Karel 180 darjah sekitar */
   private void turnAround(){
      turnLeft();
      turnLeft();
   }
}