import stanford.karel.*;
public class BipersInver extends Karel {
   /** começar a execução aqui */
   public void run() {
      while(frenteÉClaro()) {
         beeperInvertido();
         mover();
      }
      /* para evitar um bug fencepost */
      beeperInvertido();
   }

   /* pega um bip se um estiver presente abaixa um bip
    * caso contrário */
   public void beeperInvertido() {
      /* uma declaração if / else */
      if(beepersPresent()) {
         escolherBeeper();
      } else {
         colocarBeeper();
      }
   }
}