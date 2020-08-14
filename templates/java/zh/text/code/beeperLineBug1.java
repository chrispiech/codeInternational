/*
 * 文件：锥体行Bug.java
 * -------------
 * 使用while循环放置一条锥体 s的行。该程序适用
 * 于任何规模的世界。然而，因为每个世界需要一个较少move总比putBeeper的IT总是错过了锥体 。
 */
import stanford.卡雷尔.*;
public class 锥体行Bug extends 卡雷尔 {
   public void run() {
   	  /* 重复，直到卡雷尔面临一堵墙 */
      while(frontIsClear()) {
      	 /* 在当前的广场上放置一个锥体 */ 
         putBeeper();
      	 /* move到下一个广场 */
         move();
      }
   }
}