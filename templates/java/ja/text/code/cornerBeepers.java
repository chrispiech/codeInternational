/*
 * ファイル：コーナーBeeper秒.java
 * --------------------
 * 各コーナーにbeeperを配置する
 */
import stanford.カレル.*;
public class コーナーBeeper秒 extends カレル {
   public void run() {
      /* 体を4回繰り返す */
      for(int i = 0; i < 4; i++) {
      	putBeeper();
      	move();
      	move();
      	move();
      	turnLeft();
      }
   } 
}