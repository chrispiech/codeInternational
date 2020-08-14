/*
 * File：放置很多锥体S.java
 * ----------------
 * 使用for循环锥体 42 锥体 s
 */
import stanford.卡雷尔.*;
public class 放置很多锥体S extends 卡雷尔 {
   public void run() {
      move();
      /* 重复把蜂鸣器多次 */
      for(int i = 0; i < 42; i++) {
      	putBeeper();
      }
      move();
   } 
}