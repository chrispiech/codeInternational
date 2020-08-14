/*
 * Dosya: ConoSatırHatası.java
 * --------------------------
 * beeper s bir çizgi beeper için bir süre döngü kull
 * anır. Bu program her boyutta bir dünya için çalışı
 * yor. Her dünyanın bir az gerektirdiğinden Ancak, m
 * ove den s putBeeper s her zaman bir özlüyor beeper
 * .
 */
import stanford.karel.*;
public class ConoSatırHatası extends Karel {
   public void run() {
   	  /* karel bir duvara bakana kadar tekrar eder */
      while(frontIsClear()) {
      	 /* geçerli kareye bir beeper yerleştirin */ 
         putBeeper();
      	 /* move ila sonraki kareye */
         move();
      }
   }
}