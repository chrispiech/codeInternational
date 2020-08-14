/*
 * File: MoveToWall.java
 * ------------------------------
 * Uses a "while" loop to move Karel until it hits
 * a wall. Works on any sized world.
 */
import stanford.karel.*;
public class MoveToWall extends Karel {
   public void run() {
      moveToWall();
   }

   /* this is a very useful method */
   private void moveToWall() {
      while(frontIsClear()) {
         move();
      }
   } 
}