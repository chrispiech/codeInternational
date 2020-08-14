# Fichier: PremierKarel.py
# -----------------------------
# Le programme PremierKarel définit un " main "
# fonction avec des commandes qui poussent Karel à prendre
# a jeton et placez-le sur un rebord.
from karel.stanfordkarel import *

def main():
   avancer()
   ramasser_jeton()
   avancer()
   tourner_gauche()
   avancer()
   tourner_gauche()
   tourner_gauche()
   tourner_gauche()
   avancer()
   avancer()
   laisser_jeton()
   avancer()
