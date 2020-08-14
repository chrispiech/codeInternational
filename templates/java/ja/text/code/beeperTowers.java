/*
 * File：Beeper収集カレル.java
 * --------------------
 * Beeper収集カレルクラスは、一連の垂直方向の塔にあるbeeperをすべて収集し、それらを1行目の最東端の角に配置します。
 */
import stanford.カレル.*;
public class Beeper収集カレル extends カレル {

   /**
    * プログラムの入り口点を指定します。
    */
   public void run() {
      beeperをすべて収集();
      beeperすべてドロップ();
      帰宅();
   }

   /**
    * 1列目に沿って移動することで、すべてのタワーからbeeperのsをbeeper 、あらゆるbeeperのタワーをbeeper 。この方法の事後条件は、カレルが東に面する1列目の最東端の角にあるということです。
    */
   private void beeperをすべて収集() {
      while (frontIsClear()) {
         一つの塔を集める();
         move(); 
      }
      一つの塔を集める();
   }

   /**
    * 単一のタワーにbeeperます。一つの塔をまとめると呼ばれるときは、カレルは東を向いて1列目にいなければなりません。一つの塔を集めるの事後条件は、カレルが再び同じ隅の東を向いていなければならないということです。
    */
   private void 一つの塔を集める() {
      turnLeft();
      beeperの行を収集();
      turnAround();
      壁にMove();
      turnLeft();
   }

   /**
    * beeper秒の連続行を収集します。年末beeperラインが全く含まれていないコーナーで表示されるbeeper秒。
    */
   private void beeperの行を収集() {
      while (beepersPresent()) {
         pickBeeper();
         if (frontIsClear()) {
            move(); 
         }
      } 
   }

   /**
    * 現在のコーナーにbeeperすべてドロップします。
    */
   private void beeperすべてドロップ() {
      while (beepersInBag()) {
         putBeeper();
      }
   }

   /**
    * 東を向いて、1番街と1行目の角にある初期位置にカレルを返します。この方法のための前提条件は、カレルは、終了時に真である1行目、上のどこかに東向きなければならないということであるbeeperをすべて収集。
    */
   private void 帰宅() {
      turnAround();
      壁にMove();
      turnAround();
   }

   /** 壁で塞がれるまでカレルを前方に移動します。 */
   private void 壁にMove(){
      while (frontIsClear()) {
         move();
      } 
   }

   /** カレルを180度回転させる */
   private void turnAround(){
      turnLeft();
      turnLeft();
   }
}