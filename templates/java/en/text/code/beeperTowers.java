/*
 * File: BeeperCollectingKarel.java
 * --------------------------------
 * The BeeperCollectingKarel class collects all the beepers
 * in a series of vertical towers and deposits them at the
 * eastmost corner on 1st row.
 */
import stanford.karel.*;
public class BeeperCollectingKarel extends Karel {

   /**
    * Specifies the program entry point.
    */
   public void run() {
      collectAllBeepers();
      dropAllBeepers();
      returnHome();
   }

   /**
    * Collects the beepers from every tower by moving along 1st
    * row, calling collectOneTower at every corner.  The
    * postcondition for this method is that Karel is in the
    * easternmost corner of 1st row facing east.
    */
   private void collectAllBeepers() {
      while (frontIsClear()) {
         collectOneTower();
         move(); 
      }
      collectOneTower();
   }

   /**
    * Collects the beepers in a single tower. When collectOneTower
    * is called, Karel must be on 1st row facing east.  The
    * postcondition for collectOneTower is that Karel must again
    * be facing east on that same corner.
    */
   private void collectOneTower() {
      turnLeft();
      collectLineOfBeepers();
      turnAround();
      moveToWall();
      turnLeft();
   }

   /**
    * Collects a consecutive line of beepers. The end of the beeper
    * line is indicated by a corner that contains no beepers.
    */
   private void collectLineOfBeepers() {
      while (beepersPresent()) {
         pickBeeper();
         if (frontIsClear()) {
            move(); 
         }
      } 
   }

   /**
    * Drops all the beepers on the current corner.
    */
   private void dropAllBeepers() {
      while (beepersInBag()) {
         putBeeper();
      }
   }

   /**
    * Returns Karel to its initial position at the corner of 1st
    * Avenue and 1st row, facing east.  The precondition for this
    * method is that Karel must be facing east somewhere on 1st
    * row, which is true at the conclusion of collectAllBeepers.
    */
   private void returnHome() {
      turnAround();
      moveToWall();
      turnAround();
   }

   /** Moves Karel forward until it is blocked by a wall. */
   private void moveToWall(){
      while (frontIsClear()) {
         move();
      } 
   }

   /** Turns Karel 180 degrees around */
   private void turnAround(){
      turnLeft();
      turnLeft();
   }
}