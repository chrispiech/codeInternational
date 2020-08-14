/*
 * Dosya: ConoHattı.java
 * --------------------
 * beeper s bir çizgi yerleştirmek için "while" döngü
 * sünü kullanır. Bu program her boyutta bir dünya iç
 * in çalışıyor.
 */
import stanford.karel.*;
public class ConoHattı extends Karel {
   public void run() {
      /* karel bir duvara bakana kadar tekrar eder */
      while(frontIsClear()) {
         /* geçerli kareye bir beeper yerleştirin */ 
         putBeeper();
         /* move ila sonraki kareye */
         move();
      }
      /* çit sonrası böceği çözdü */
      putBeeper();
   }
}