/*
 * File: PagerMengumpulkanKarel.java
 * ---------------------------------
 * Kelas PagerMengumpulkanKarel mengumpulkan semua
 * penyeranta dalam serangkaian menara vertikal dan
 * menyimpannya di sudut paling timur di baris
 * pertama.
 */
import stanford.karel.*;
public class PagerMengumpulkanKarel extends Karel {

   /**
    * Menentukan titik masuk program.
    */
   public void run() {
      kumpulkanSemuaBeepers();
      dropAllBeepers();
      kembaliKeRumah();
   }

   /**
    * Mengumpulkan penyeranta dari setiap menara dengan
    * bergerak di sepanjang baris ke-1, memanggil
    * kumpulkanOneTower di setiap sudut. Kondisi akhir
    * untuk metode ini adalah bahwa Karel berada di
    * sudut paling timur dari baris pertama menghadap
    * ke timur.
    */
   private void kumpulkanSemuaBeepers() {
      while (depanJelas()) {
         kumpulkanOneTower();
         pindah(); 
      }
      kumpulkanOneTower();
   }

   /**
    * Mengumpulkan penyeranta dalam satu menara. Ketika
    * kumpulkanOneTower dipanggil, Karel harus berada
    * di baris pertama yang menghadap ke timur.
    * Postcondition untuk kumpulkanOneTower adalah
    * bahwa Karel harus lagi menghadap ke timur di
    * sudut yang sama.
    */
   private void kumpulkanOneTower() {
      belokKiri();
      mengumpulkanLineOfBeepers();
      berputar();
      pindahKeDinding();
      belokKiri();
   }

   /**
    * Mengumpulkan garis bip berurutan. Ujung garis
    * pager ditunjukkan oleh sudut yang tidak berisi
    * penyeranta.
    */
   private void mengumpulkanLineOfBeepers() {
      while (pagerHadir()) {
         pilihPager();
         if (depanJelas()) {
            pindah(); 
         }
      } 
   }

   /**
    * Drop semua penyeranta di sudut saat ini.
    */
   private void dropAllBeepers() {
      while (pagerDalamTas()) {
         masukkanBeeper();
      }
   }

   /**
    * Mengembalikan Karel ke posisi awalnya di sudut 1
    * Avenue dan baris 1, menghadap ke timur. Prasyarat
    * untuk metode ini adalah bahwa Karel harus
    * menghadap ke timur di baris ke-1, yang berlaku
    * pada akhir kumpulkanSemuaBeepers.
    */
   private void kembaliKeRumah() {
      berputar();
      pindahKeDinding();
      berputar();
   }

   /** Memajukan Karel ke depan sampai terhalang oleh dinding. */
   private void pindahKeDinding(){
      while (depanJelas()) {
         pindah();
      } 
   }

   /** Mengubah Karel 180 derajat */
   private void berputar(){
      belokKiri();
      belokKiri();
   }
}