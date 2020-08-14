/*
 * ملف: مخروطاختياركاريل. java
 * --------------------------
 * يعرف برنامج run طريقة " run " بثلاثة أوامر. هذه ال
 * أوامر تسبب كاريل إلى move إلى الأمام كتلة واحدة، و
 * التقاط مخروط ، ومن ثم move قدما إلى الزاوية القادم
 * ة.
 */
import stanford.كاريل.*;
public class مخروطاختياركاريل extends كاريل {
   public void run() {
      move();
      pickBeeper();
      move();
      turnLeft();
      move();
      turnRight();
      move();
      move();
      putBeeper();
      move();
   }

   /**
    * يتحول كاريل 90 درجة إلى اليمين.
    */
   private void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }
}