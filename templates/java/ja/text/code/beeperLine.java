/*
 * ファイル：Beeper行.java
 * ----------------
 * "while"ループを使用してbeeper秒の行をbeeperます。このプログラムは、あらゆる規模の世界で機能します。
 */
import stanford.カレル.*;
public class Beeper行 extends カレル {
   public void run() {
      /* カレルが壁に面するまで繰り返す */
      while(frontIsClear()) {
         /* 現在の広場にbeeperを配置する */ 
         putBeeper();
         /* 次の広場へmove */
         move();
      }
      /* フェンスポストのバグを解決 */
      putBeeper();
   }
}