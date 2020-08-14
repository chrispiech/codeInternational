/*
 * ملف: مخروطاختياركاريل. java
 * --------------------------
 * يُعرّف برنامج run طريقة " run " بالأوامر التي تسبب
 * كاريل لالتقاط مخروط ووضعه على الحافة.
 */
import stanford.كاريل.*;
public class مخروطاختياركاريل extends كاريل {
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