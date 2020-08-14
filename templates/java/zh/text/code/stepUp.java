/*
 * 文件：锥体采精锥体.java
 * -------------
 * 锥体采精锥体程序定义了一个“ run ”方法，其命
 * 令使卡雷尔获取锥体并将其放置在壁架上。
 */
import stanford.卡雷尔.*;
public class 锥体采摘锥体 extends 卡雷尔 {
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