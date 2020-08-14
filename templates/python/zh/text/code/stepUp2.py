＃文件：BeeperPickingKarel.py
＃-----------------------------
＃BeeperPickingKarel程序定义了“ main ”
＃函数带有三个命令。这些命令导致
＃卡雷尔（Karel）以move前进一个方块，捡起一个
＃ 锥体 ，然后move到达下一个角。
from 卡雷尔.stanford import *
def main():
   move()
   选择锥体()
   move()
   turn_left()
   move()
   turn_right()
   move()
   move()
   放锥体()
   move()

def turn_right():
   turn_left()
   turn_left()
   turn_left()