/*
 * 文件：第一个卡雷尔.java
 * -------------
 * 第一个卡雷尔程序定义了一个带有三个命令的“ run
 * ”方法。这些命令导致卡雷尔向move前进一个
 * 区块，然后在下一个move前方获得锥体然后move
 * 。
 */
import stanford.卡雷尔.*;
public class 第一个卡雷尔 extends 卡雷尔 {
   /* 该计划在这里开始run */
   public void run() {
      move();
      pickBeeper();
      move();
   } 
}