/*
 * ملف: الزاويةمخروطق. java
 * -----------------------
 * يضع مخروط واحد في كل زاوية
 */
import stanford.كاريل.*;
public class الزاويةمخروطق extends كاريل {
   public void run() {
      /* كرر الجسم 4 مرات */
      for(int i = 0; i < 4; i++) {
      	putBeeper();
      	move();
      	move();
      	move();
      	turnLeft();
      }
   } 
}