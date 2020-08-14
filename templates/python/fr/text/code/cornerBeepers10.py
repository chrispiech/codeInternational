# Fichier: CornerFive Jetons .py
# -----------------------------
# Place cinq jetons dans chaque coin
from karel.stanfordkarel import *
def main():
   # Répétez une fois pour chaque coin
   for i in range(4):
      mettre_cinq_jetons()
      avancer_au_coin_suivant()

# repositionner Karel dans le coin suivant
def avancer_au_coin_suivant() :
   avancer()
   avancer()
   avancer()
   tourner_gauche()

# places 5 jetons utilisant un boucle for
def mettre_cinq_jetons() :
   for i in range(5):
   	laisser_jeton()
