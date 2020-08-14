# Fichier: MoveToWall.py
# ------------------------------
# Utilise une boucle «while» vers avancer Karel jusqu'à ce qu'elle avancer
# un mur. Fonctionne sur n'importe quel monde de taille.
from karel.stanfordkarel import *

# le programme commence par main
def main():
   # appeler la fonction avancer au mur
   avancer_au_mur()

# c'est une fonction très utile
def avancer_au_mur():
   # répéter le corps tant que la condition est maintenue
   while l'avant_est_clair():
      avancer()


