import stanford.karel.*;
public class PotholeFillingKarel extends Karel {
   public void run() {
      move();
      fillPothole();
      move();
   }

   /**
    * Fills the pothole beneath Karel's current position by 
    * placing a beeper on that corner. For this method to work 
    * correctly, Karel must be facing east immediately above the 
    * pothole. When execution is complete, Karel will have 
    * returned to the same square and will again be facing east.
    */
   private void fillPothole() {
      turnRight();
      move();
      putBeeper();
      turnAround();
      move();
      turnRight();
   } 

   /** Turns Karel 90 degrees to the right. */
   public void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }

   /** Turns Karel around 180 degrees. */
   public void turnAround() {
      turnLeft();
      turnLeft();
   }
}