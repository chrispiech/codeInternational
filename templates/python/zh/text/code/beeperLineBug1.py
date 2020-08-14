＃文件：BeeperLineBug.py
＃------------------------------
＃使用while循环放置一行锥体 s。
＃此程序适用于任何规模的世界。
＃但是，因为每个世界都减少了一个
＃ move比put_ 锥体总是丢失锥体 。
from 卡雷尔.stanford import *

＃程序从main开始
def main():
   ＃重复直到karel面对墙
   while front_is_clear():
      ＃在当前正方形上放置一个锥体
      放锥体()
      ＃ move下一个方块
      move()

