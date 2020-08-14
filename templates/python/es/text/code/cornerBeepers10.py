# Archivo: CornerFive Conos .py
# -----------------------------
# conos cinco conos en cada esquina
from karel.stanfordkarel import *
def main():
   # Repita una vez para cada esquina
   for i in range(4):
      poner_cinco_conos()
      moverse_a_la_siguiente_esquina()

# reposicionar karel a la siguiente esquina
def moverse_a_la_siguiente_esquina() :
   moverse()
   moverse()
   moverse()
   girar_izquierda()

# lugares 5 conos usando un ciclo for
def poner_cinco_conos() :
   for i in range(5):
   	poner_cono()
