/*
 * ファイル：最初のカレル.java
 * ---------------
 * カレルはbeeperをピックアップしてbeeperに置きます。
 */
import stanford.カレル.*;
public class 最初のカレル extends カレル {
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