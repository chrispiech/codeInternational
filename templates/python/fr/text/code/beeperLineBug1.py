# Fichier: Jeton LineBug.py
# ------------------------------
# Utilise un boucle while pour placer une ligne de jetons .
# Ce programme fonctionne pour un monde de toute taille.
# Cependant, parce que chaque monde en nécessite un de moins
# avancer s que put_ jetons il manque toujours un jeton .
from karel.stanfordkarel import *

# programme commence à main
def main():
   # se répète jusqu'à ce que Karel fasse face à un mur
   while l'avant_est_clair():
      # place un jeton sur la case actuelle
      laisser_jeton()
      # avancer au carré suivant
      avancer()

