import stanford.karel.*;
public class InverBeepers extends Karel {
   /** mulai eksekusi di sini */
   public void run() {
      while(depanJelas()) {
         membalikkanPager();
         pindah();
      }
      /* untuk mencegah bug fencepost */
      membalikkanPager();
   }

   /* mengambil pager jika ada, letakkan pager
    * sebaliknya */
   public void membalikkanPager() {
      /* pernyataan if / else */
      if(pagerHadir()) {
         pilihPager();
      } else {
         masukkanBeeper();
      }
   }
}