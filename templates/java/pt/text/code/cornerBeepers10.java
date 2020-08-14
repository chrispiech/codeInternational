/*
 * Ficheiro: CornerFiveBeepers.java
 * --------------------------------
 * Coloca cinco apitos em cada canto
 */
import stanford.karel.*;
public class CantoCincoBeepers extends Karel {

   public void run() {
      /* Repita uma vez para cada canto */
      for(int i = 0; i < 4; i++) {
         colocarCincoBipers();
         moverParaOPróximoCanto();
      }
   } 

   /* reposicionar karel para a próxima esquina */
   public void moverParaOPróximoCanto() {
      mover();
      mover();
      mover();
      vireAEsquerda();
   }

   /* coloca 5 apitos usando um loop for */
   public void colocarCincoBipers() {
      for(int i = 0; i < 5; i++) {
      	colocarBeeper();
      }
   }
}