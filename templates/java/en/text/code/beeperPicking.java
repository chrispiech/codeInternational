/*
 * File: FirstKarel.java
 * -----------------------------
 * The FirstKarel program defines a "run" 
 * method with three commands. These commands cause  
 * Karel to move forward one block, pick up a beeper
 * and then move ahead to the next corner.
 */
import stanford.karel.*;
public class FirstKarel extends Karel {
   /* the program begins running here */
   public void run() {
      move();
      pickBeeper();
      move();
   } 
}