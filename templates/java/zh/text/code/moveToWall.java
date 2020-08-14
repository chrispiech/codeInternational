/*
 * 文件：移动到墙.java
 * -----------
 * 使用“while”循环到move 卡雷尔，直到
 * 撞到墙壁。适用于任何规模的世界。
 */
import stanford.卡雷尔.*;
public class Move到墙 extends 卡雷尔 {
   public void run() {
      move到墙();
   }

   /* 这是一个非常有用的方法 */
   private void move到墙() {
      while(frontIsClear()) {
         move();
      }
   } 
}