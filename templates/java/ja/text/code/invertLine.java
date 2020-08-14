import stanford.カレル.*;
public class インバーBeeper秒 extends カレル {
   /** ここから実行を開始 */
   public void run() {
      while(frontIsClear()) {
         反転するBeeper();
         move();
      }
      /* フェンスポストのバグを防ぐため */
      反転するBeeper();
   }

   /*  拾っbeeper 1が存在する場合下ろしbeepe
    * rそうでない場合は */
   public void 反転するBeeper() {
      /* if / elseステートメント */
      if(beepersPresent()) {
         pickBeeper();
      } else {
         putBeeper();
      }
   }
}