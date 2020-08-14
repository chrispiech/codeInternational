import stanford.karel.*;
public class EnchimentoDeCaldeirãoKarel extends Karel {
   public void run() {
      mover();
      encherOBuraco();
      mover();
   }

   /**
    * Enche o buraco debaixo da posição atual de Karel,
    * colocando um bip naquele canto. Para que esse
    * método funcione corretamente, Karel deve estar
    * voltado para o leste imediatamente acima do
    * buraco. Quando a execução estiver completa, Karel
    * retornará ao mesmo quadrado e novamente estará
    * voltado para o leste.
    */
   private void encherOBuraco() {
      vireÀDireita();
      mover();
      colocarBeeper();
      inversãoDeMarcha();
      mover();
      vireÀDireita();
   } 

   /** Liga Karel 90 graus para a direita. */
   public void vireÀDireita() {
      vireAEsquerda();
      vireAEsquerda();
      vireAEsquerda();
   }

   /** Liga Karel em 180 graus. */
   public void inversãoDeMarcha() {
      vireAEsquerda();
      vireAEsquerda();
   }
}