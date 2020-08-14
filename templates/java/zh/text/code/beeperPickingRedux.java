/*
 * 文件：第一个卡雷尔.java
 * -------------
 * 卡雷尔拿起锥体并把它放在壁架上。
 */
import stanford.卡雷尔.*;
public class 第一个卡雷尔 extends 卡雷尔 {
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