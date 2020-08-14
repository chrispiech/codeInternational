＃文件：CornerFiveBeepers.py
＃-----------------------------
＃在每个角落锥体五个锥体秒
from 卡雷尔.stanford import *
def main():
   ＃对每个角重复一次
   for i in range(4):
      放置五个锥体秒()
      move至下一个角落()

＃将karel重新定位到下一个角落
def move至下一个角落() :
   move()
   move()
   move()
   turn_left()

＃使用for循环放置5 锥体 s
def 放置五个锥体秒() :
   for i in range(5):
   	放锥体()
