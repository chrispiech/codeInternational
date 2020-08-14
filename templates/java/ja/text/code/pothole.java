import stanford.カレル.*;
public class 穴あき充填カレル extends カレル {
   public void run() {
      move();
      穴を埋める();
      move();
   }

   /**
    * その角にbeeperを配置することによって、カレルの現在位置の下の穴をbeeperます。この方法が正しく機能するためには、カレルは穴の真上の東を向いていなければなりません。実行が完了すると、カレルは同じ広場に戻り、再び東に向かいます。
    */
   private void 穴を埋める() {
      turnRight();
      move();
      putBeeper();
      turnAround();
      move();
      turnRight();
   } 

   /** カレルを右に90度回転させます。 */
   public void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }

   /** カレルを180度回転させます。 */
   public void turnAround() {
      turnLeft();
      turnLeft();
   }
}