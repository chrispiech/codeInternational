import stanford.卡雷尔.*;
public class 坑洞填充卡雷尔 extends 卡雷尔 {
   public void run() {
      move();
      填充坑洼();
      move();
   }

   /**
    * 通过在该角落放置一个锥体填充卡雷尔当前位置下方的坑洞。为了使这种方法正常工作，卡雷尔必须在坑洞正上方朝东。执行完成后，卡雷尔将返回同一个广场并再次面向东方。
    */
   private void 填充坑洼() {
      turnRight();
      move();
      putBeeper();
      turnAround();
      move();
      turnRight();
   } 

   /** 卡雷尔向右转90度。 */
   public void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }

   /** 将卡雷尔变成180度左右。 */
   public void turnAround() {
      turnLeft();
      turnLeft();
   }
}