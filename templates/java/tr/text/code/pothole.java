import stanford.karel.*;
public class ÇukurDoldurmaKareli extends Karel {
   public void run() {
      move();
      çukuruDoldur();
      move();
   }

   /**
    * Bu köşeye beeper koyarak beeper mevcut pozisyonunu
    * n altındaki çukuru doldurur. Bu yöntemin doğru çal
    * ışması için Karel'in, çukurun hemen üstünden doğuy
    * a bakması gerekir. Yürütme tamamlandığında, Karel
    * aynı kareye geri dönecek ve tekrar doğuya bakacak.
    */
   private void çukuruDoldur() {
      turnRight();
      move();
      putBeeper();
      turnAround();
      move();
      turnRight();
   } 

   /** Karel'i 90 derece sağa döndürür. */
   public void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }

   /** Karel'i yaklaşık 180 derece döndürür. */
   public void turnAround() {
      turnLeft();
      turnLeft();
   }
}