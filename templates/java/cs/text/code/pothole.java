import stanford.karel.*;
public class VýplňNaplňujícíKarel extends Karel {
   public void run() {
      move();
      výplň();
      move();
   }

   /**
    * Vyplní díru pod současnou pozicí Karla umístěním k
    * uzel na tento roh. Aby tato metoda fungovala správ
    * ně, musí být Karel otočen na východ těsně nad výti
    * skem. Když bude poprava dokončena, Karel se vrátí
    * na stejné náměstí a bude opět směřovat na východ.
    */
   private void výplň() {
      turnRight();
      move();
      putBeeper();
      turnAround();
      move();
      turnRight();
   } 

   /** Otočí Karla o 90 stupňů doprava. */
   public void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }

   /** Otočí Karla o 180 stupňů. */
   public void turnAround() {
      turnLeft();
      turnLeft();
   }
}