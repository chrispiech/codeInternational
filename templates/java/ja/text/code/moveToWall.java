/*
 * ファイル：壁にMove.java
 * ---------------
 * 壁に当たるまでmoveカレルへの「while」ループを使用します。あらゆる規模の世界で動作します。
 */
import stanford.カレル.*;
public class 壁にMove extends カレル {
   public void run() {
      壁にMove();
   }

   /* これはとても便利な方法です */
   private void 壁にMove() {
      while(frontIsClear()) {
         move();
      }
   } 
}