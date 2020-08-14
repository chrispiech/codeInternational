# File: BeeperLineBug.py
# ------------------------------
# Uses a while loop to place a line of beepers.
# This program works for a world of any size.
# However, because each world requires one fewer
# moves than put_beepers it always misses a beeper.
from karel.stanfordkarel import *

# program starts at main
def main():
   # repeats until karel faces a wall
   while front_is_clear():
      # place a beeper on current square
      put_beeper()
      # move to the next square
      move()

