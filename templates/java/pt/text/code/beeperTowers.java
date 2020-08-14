/*
 * Ficheiro: BeeperCollectingKarel.java
 * ------------------------------------
 * A classe BeeperCollectingKarel coleta todos os
 * bipes em uma série de torres verticais e os
 * deposita no canto mais a leste da primeira linha.
 */
import stanford.karel.*;
public class BeeperColetandoKarel extends Karel {

   /**
    * Especifica o ponto de entrada do programa.
    */
   public void run() {
      recolherTodosOsBipers();
      soltarTodosOsBipers();
      voltarParaCasa();
   }

   /**
    * Coleta os bipes de todas as torres, movendo-se ao
    * longo da primeira linha, chamando collectOneTower
    * em cada esquina. A pós-condição para este método
    * é que Karel está no canto mais oriental da
    * primeira fileira voltada para o leste.
    */
   private void recolherTodosOsBipers() {
      while (frenteÉClaro()) {
         coletarUmaTorre();
         mover(); 
      }
      coletarUmaTorre();
   }

   /**
    * Coleta os bipes em uma única torre. Quando
    * coletarUmaTorre é chamado, Karel deve estar na 1ª
    * fila de frente para o leste. A pós-condição para
    * coletarUmaTorre é que Karel deve novamente estar
    * voltado para o leste na mesma esquina.
    */
   private void coletarUmaTorre() {
      vireAEsquerda();
      coletarLinhaDeBipers();
      inversãoDeMarcha();
      moverParaParede();
      vireAEsquerda();
   }

   /**
    * Coleta uma linha consecutiva de bipes. A
    * extremidade da linha do apito é indicada por um
    * canto que não contém bipes.
    */
   private void coletarLinhaDeBipers() {
      while (beepersPresent()) {
         escolherBeeper();
         if (frenteÉClaro()) {
            mover(); 
         }
      } 
   }

   /**
    * Solta todos os bipes no canto atual.
    */
   private void soltarTodosOsBipers() {
      while (bipesNoSaco()) {
         colocarBeeper();
      }
   }

   /**
    * Retorna Karel à sua posição inicial na esquina da
    * 1ª Avenida com a 1ª fila, voltada para o leste. A
    * pré-condição para este método é que Karel deve
    * estar voltado para o leste em algum lugar na
    * primeira linha, o que é verdade na conclusão do
    * código de contribuição.
    */
   private void voltarParaCasa() {
      inversãoDeMarcha();
      moverParaParede();
      inversãoDeMarcha();
   }

   /** Move Karel para frente até que seja bloqueado por uma parede. */
   private void moverParaParede(){
      while (frenteÉClaro()) {
         mover();
      } 
   }

   /** Liga Karel 180 graus ao redor */
   private void inversãoDeMarcha(){
      vireAEsquerda();
      vireAEsquerda();
   }
}