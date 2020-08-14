/*
 * File：第五个角落锥体.java
 * ----------------
 * 在每个角落锥体五个锥体
 */
import stanford.卡雷尔.*;
public class 第五个角落锥体 extends 卡雷尔 {

   public void run() {
      /* 每个角落重复一次 */
      for(int i = 0; i < 4; i++) {
         放五个锥体();
         move到下一个角落();
      }
   } 

   /* 将卡雷尔重新定位到下一个角落 */
   public void move到下一个角落() {
      move();
      move();
      move();
      turnLeft();
   }

   /* 使用for循环放置5 锥体 s */
   public void 放五个锥体() {
      for(int i = 0; i < 5; i++) {
      	putBeeper();
      }
   }
}