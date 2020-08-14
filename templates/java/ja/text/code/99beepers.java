/*
 * File：Beeper多数Beeperする.java
 * -------------------------
 * forループを使用して42 beeper sを配置
 * する
 */
import stanford.カレル.*;
public class Beeper多数Beeperする extends カレル {
   public void run() {
      move();
      /* putBeeper何度も繰り返す */
      for(int i = 0; i < 42; i++) {
      	putBeeper();
      }
      move();
   } 
}