/*
 * ファイル：最初のカレル.java
 * ---------------
 * 最初のカレルプログラムは、3つのコマンドで " r
 * un "メソッドを定義しています。これらのコマンド
 * により、カレルはmove 1ブロックbeepe
 * r 、 beeper 、次にmoveを次のコーナー
 * へmoveます。
 */
import stanford.カレル.*;
public class 最初のカレル extends カレル {
   /* プログラムはここで開始run */
   public void run() {
      move();
      pickBeeper();
      move();
   } 
}