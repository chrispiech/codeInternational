import stanford.karel.*;
public class SchlaglochfüllungKarel extends Karel {
   public void run() {
      move();
      schlaglochFüllen();
      move();
   }

   /**
    * Füllt das Schlagloch unter Karels aktueller Positi
    * on mit einem beeper an dieser Ecke. Damit diese Me
    * thode korrekt funktioniert, muss Karel direkt über
    * dem Schlagloch nach Osten zeigen. Wenn die Hinric
    * htung abgeschlossen ist, ist Karel wieder auf dem
    * gleichen Platz und zeigt wieder nach Osten.
    */
   private void schlaglochFüllen() {
      turnRight();
      move();
      putBeeper();
      turnAround();
      move();
      turnRight();
   } 

   /** Dreht Karel um 90 Grad nach rechts. */
   public void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }

   /** Dreht Karel um 180 Grad. */
   public void turnAround() {
      turnLeft();
      turnLeft();
   }
}