/*
 * 文件：锥体行.java
 * ----------
 * 使用“while”循环放置锥体 s的行。该程序适用
 * 于任何规模的世界。
 */
import stanford.卡雷尔.*;
public class 锥体行 extends 卡雷尔 {
   public void run() {
      /* 重复，直到卡雷尔面临一堵墙 */
      while(frontIsClear()) {
         /* 在当前的广场上放置一个锥体 */ 
         putBeeper();
         /* move到下一个广场 */
         move();
      }
      /* 解决了围栏后的错误 */
      putBeeper();
   }
}