# Archivo: MoveToWall.py
# ------------------------------
# Utiliza un "while" ciclo a moverse Karel hasta que llega
# una pared. Funciona en mundos de cualquier tamaño.
from karel.stanfordkarel import *

# el programa comienza con main
def main():
   # llamar al moverse a la función de pared
   moverse_a_la_pared()

# esta es una función muy útil
def moverse_a_la_pared():
   # repite el cuerpo mientras la condición se mantiene
   while frente_despejado():
      moverse()


