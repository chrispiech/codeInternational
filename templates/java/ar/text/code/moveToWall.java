/*
 * ملف: نقل إلىالجدار. java
 * -----------------------
 * يستخدم "بينما" دورة إلى move كاريل حتى تصل إلى الح
 * ائط. يعمل على أي عالم الحجم.
 */
import stanford.كاريل.*;
public class Moveإلىالجدار extends كاريل {
   public void run() {
      moveإلىالجدار();
   }

   /* هذه طريقة مفيدة للغاية */
   private void moveإلىالجدار() {
      while(frontIsClear()) {
         move();
      }
   } 
}