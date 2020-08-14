/*
 * 文件：锥体采精锥体.java
 * -------------
 * 锥体采注锥体程序定义了一个带有三个命令的“ run
 * ”方法。这些命令导致卡雷尔向move前进一个
 * 区块，获得锥体 ，然后move前进到下一个角落。
 */
import stanford.卡雷尔.*;
public class 锥体采摘锥体 extends 卡雷尔 {
   public void run() {
      move();
      pickBeeper();
      move();
      turnLeft();
      move();
      turnRight();
      move();
      move();
      putBeeper();
      move();
   }

   /**
    * 卡雷尔向右转90度。
    */
   private void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }
}