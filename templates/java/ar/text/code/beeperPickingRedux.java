/*
 * ملف: أولكاريل
 * ------------
 * كاريل يلتقط مخروط ويضعه على الحافة.
 */
import stanford.كاريل.*;
public class أولكاريل extends كاريل {
   public void run() {
      move();
      pickBeeper();
      move();
      turnLeft();
      move();
      turnLeft();
      turnLeft();
      turnLeft();
      move();
      move();
      putBeeper();
      move();
   } 
}