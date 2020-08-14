/*
 * Archivo: BeeperRecogiendoKarel.java
 * -----------------------------------
 * El programa BeeperRecogiendoKarel define un
 * método de "ejecución" con tres comandos. Estos
 * comandos hacen que Karel avance un bloque,
 * levante un beeper y luego avance hasta la
 * siguiente esquina.
 */
import stanford.karel.*;
public class BeeperRecogiendoKarel extends Karel {
   /* el programa comienza a ejecutarse aquí */
   public void run() {
      moverse();
      recogerBeeper();
      moverse();
   } 
}