import stanford.karel.*;
public class InverBeepers extends Karel {
   /** iniciar la ejecución aquí */
   public void run() {
      while(elFrenteEsClaro()) {
         invertirBeeper();
         moverse();
      }
      /* para evitar un error de poste */
      invertirBeeper();
   }

   /* recoge un beeper si uno está presente pone un
    * beeper de lo contrario */
   public void invertirBeeper() {
      /* una declaración if / else */
      if(beepersPresente()) {
         recogerBeeper();
      } else {
         ponerBeeper();
      }
   }
}