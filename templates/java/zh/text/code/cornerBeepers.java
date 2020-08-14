/*
 * 文件：阁锥体S.java
 * -----------
 * 在每个角落锥体一个锥体
 */
import stanford.卡雷尔.*;
public class 角锥体S extends 卡雷尔 {
   public void run() {
      /* 重复身体4次 */
      for(int i = 0; i < 4; i++) {
      	putBeeper();
      	move();
      	move();
      	move();
      	turnLeft();
      }
   } 
}