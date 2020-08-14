/*
 * ملف: ضعمخروطثانية. java
 * ----------------------
 * يضع 42 مخروط s باستخدام دورة for
 */
import stanford.كاريل.*;
public class ضعمخروطثانية extends كاريل {
   public void run() {
      move();
      /* كرر وضعالصافرة عدة مرات */
      for(int i = 0; i < 42; i++) {
      	putBeeper();
      }
      move();
   } 
}