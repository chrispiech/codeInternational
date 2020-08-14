# Fichier: PlaceMany Jetons .py
# -----------------------------
# Places 42 jetons utilisant un boucle for
from karel.stanfordkarel import *

def main():
   avancer()
   # répéter laisser_jeton plusieurs fois
   for i in range(42):
      laisser_jeton()
   avancer()
