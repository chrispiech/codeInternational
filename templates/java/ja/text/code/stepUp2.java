/*
 * File：Beeperピッキングカレル.java
 * -----------------------
 * Beeper runカレルプログラムは、3つのコマ
 * ンドで " run "メソッドを定義します。これら
 * のコマンドにより、カレルは1ブロックをmove転送し、 beeper 、次にmoveを次のコーナーにmoveします。
 */
import stanford.カレル.*;
public class Beeperピッキングカレル extends カレル {
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
    * カレルを右に90度回転させます。
    */
   private void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }
}