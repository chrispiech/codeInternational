
# Fichier: JetonLigne.py
# ------------------------------
# Utilise un boucle while pour placer une ligne de jetons .
# Ce programme fonctionne pour un monde de toute taille.
from karel.stanfordkarel import *

# programme commence à main
def main():
   # se répète jusqu'à ce que Karel fasse face à un mur
   while l'avant_est_clair():
      # place un jeton sur la case actuelle
      laisser_jeton()
      # avancer au carré suivant
      avancer()
   # résout le bogue de clôture
   laisser_jeton()


