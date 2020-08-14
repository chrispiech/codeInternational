/*
 * File：Beeperピッキングカレル.java
 * -----------------------
 * Beeper runカレルプログラムは、カレル
 * がbeeperをピックアップして棚の上に置くようにするコマンドで " run "メソッドを定義します。
 */
import stanford.カレル.*;
public class Beeperピッキングカレル extends カレル {
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