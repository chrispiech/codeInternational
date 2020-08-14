/*
 * File：Beeper行のバグ.java
 * -------------------
 * whileループを使用してbeeper秒の行をbeeperます。このプログラムは、あらゆる規模の世界で機能します。それぞれの世界が1つの少なく必要とするためしかし、 moveよりS putBeeper秒それは常にミスbeeper 。
 */
import stanford.カレル.*;
public class Beeper行のバグ extends カレル {
   public void run() {
   	  /* カレルが壁に面するまで繰り返す */
      while(frontIsClear()) {
      	 /* 現在の広場にbeeperを配置する */ 
         putBeeper();
      	 /* 次の広場へmove */
         move();
      }
   }
}