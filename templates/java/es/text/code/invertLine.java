import stanford.karel.*;
public class InverConos extends Karel {
   /** iniciar la ejecución aquí */
   public void run() {
      while(frenteDespejado()) {
         invertirCono();
         moverse();
      }
      /* para prevenir un error de poste */
      invertirCono();
   }

   /*  recoge un cono si uno está presente coloca un cono
    * contrario */
   public void invertirCono() {
      /* una declaración if / else */
      if(conosPresentes()) {
         recogerCono();
      } else {
         ponerCono();
      }
   }
}