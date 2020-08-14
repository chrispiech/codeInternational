import stanford.karel.*;
public class InverJetons extends Karel {
   /** commencer l'exécution ici */
   public void run() {
      while(devantDegage()) {
         invertiJeton();
         avancer();
      }
      /* pour empêcher un bug fencepost */
      invertiJeton();
   }

   /*  prend un jeton si on est présent pose un jeton sin
    * on */
   public void invertiJeton() {
      /* une déclaration if / else */
      if(jetonsPresents()) {
         ramasserJeton();
      } else {
         laisserJeton();
      }
   }
}