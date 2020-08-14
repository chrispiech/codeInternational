import stanford.卡雷尔.*;
public class 锥体S extends 卡雷尔 {
   /** 在这里开始执行 */
   public void run() {
      while(frontIsClear()) {
         反转锥体();
         move();
      }
      /* 防止fencepost bug */
      反转锥体();
   }

   /*  如果存在锥体则选择锥体否则为锥体 */
   public void 反转锥体() {
      /* 一个if / else语句 */
      if(beepersPresent()) {
         pickBeeper();
      } else {
         putBeeper();
      }
   }
}