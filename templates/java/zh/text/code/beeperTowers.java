/*
 * 文件：锥体收集锥体.java
 * -------------
 * 锥体收集锥体类在一系列垂直塔中收集所有锥体 ，并将
 * 它们存放在第一排的最东端。
 */
import stanford.卡雷尔.*;
public class 锥体收集锥体 extends 卡雷尔 {

   /**
    * 指定程序入口点。
    */
   public void run() {
      收集所有锥体S();
      全部锥体秒();
      回家();
   }

   /**
    * 通过沿着第一排移动从每个塔收集锥体 ，在每个角落呼
    * 叫收集一个塔。这种方法的后置条件是卡雷尔位于第一排朝东的最东端。
    */
   private void 收集所有锥体S() {
      while (frontIsClear()) {
         收集一个塔();
         move(); 
      }
      收集一个塔();
   }

   /**
    * 在一个塔中收集锥体 。当收集一个塔被叫时，卡雷尔必
    * 须在面向东的第一排。收集一个塔的后置条件是卡雷尔必须再次朝向同一角落的东方。
    */
   private void 收集一个塔() {
      turnLeft();
      收集锥体的行();
      turnAround();
      move到墙();
      turnLeft();
   }

   /**
    * 收集锥体秒的连续行。 锥体行的末尾由不包含锥体 s
    * 的角指示。
    */
   private void 收集锥体的行() {
      while (beepersPresent()) {
         pickBeeper();
         if (frontIsClear()) {
            move(); 
         }
      } 
   }

   /**
    * 锥体当前角落的所有锥体 。
    */
   private void 全部锥体秒() {
      while (beepersInBag()) {
         putBeeper();
      }
   }

   /**
    * 将卡雷尔返回到第一大道和第一排角落的初始位置，朝向东方。这种方法的前提条件是卡雷尔必须在第一排的某处朝东，这在收集所有锥体S的结尾是正确的。
    */
   private void 回家() {
      turnAround();
      move到墙();
      turnAround();
   }

   /** 向前移动卡雷尔，直到被墙挡住。 */
   private void move到墙(){
      while (frontIsClear()) {
         move();
      } 
   }

   /** 将卡雷尔变成180度左右 */
   private void turnAround(){
      turnLeft();
      turnLeft();
   }
}