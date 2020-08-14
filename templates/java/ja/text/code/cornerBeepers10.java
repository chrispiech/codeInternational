/*
 * ファイル：コーナー・ファイバーBeeper秒.java
 * --------------------------
 * 各コーナーにbeeper 5つbeeper
 */
import stanford.カレル.*;
public class コーナー・ファイブBeeper秒 extends カレル {

   public void run() {
      /* コーナーごとに1回繰り返す */
      for(int i = 0; i < 4; i++) {
         5つBeeper();
         次のコーナーへMove();
      }
   } 

   /* カレルを次のコーナーに移動 */
   public void 次のコーナーへMove() {
      move();
      move();
      move();
      turnLeft();
   }

   /* forループを使用して5 beeperします。 */
   public void 5つBeeper() {
      for(int i = 0; i < 5; i++) {
      	putBeeper();
      }
   }
}