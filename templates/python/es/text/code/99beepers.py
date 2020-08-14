# Archivo: LugarMuchosConos.py
# -----------------------------
# Places 42 conos usando un ciclo for
from karel.stanfordkarel import *

def main():
   moverse()
   # repetir poner_cono muchas veces
   for i in range(42):
      poner_cono()
   moverse()
