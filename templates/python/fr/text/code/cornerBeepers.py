# Fichier: Corner Jetons .py
# -----------------------------
# Place un jeton dans chaque coin
from karel.stanfordkarel import *
def main():
   # répéter le corps 4 fois
   for i in range(4):
	   laisser_jeton()
	   avancer()
	   avancer()
	   avancer()
	   tourner_gauche()
