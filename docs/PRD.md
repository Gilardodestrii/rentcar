# RenCar PRD

## 1. Ringkasan Produk
RenCar adalah SaaS sistem manajemen rental mobil berbasis web untuk banyak tenant (pemilik rental) dalam satu kodebase Laravel. Produk ini menyediakan:
- Landing page publik untuk pelanggan.
- Form booking online.
- Dashboard admin untuk kelola armada, sopir, booking, pengeluaran, testimoni, dan pengaturan website.
- Multi-tenancy dengan data tenant terpisah.
- Frontend berbasis React + Inertia.js, bukan Blade penuh.

## 2. Tujuan Produk
- Mempermudah bisnis rental mobil menerima booking online.
- Mengurangi konflik jadwal sewa dan maintenance.
- Menyediakan CMS dinamis untuk landing page.
- Menyediakan dashboard operasional yang siap dipakai tenant.
- Menjadi dasar SaaS berlangganan untuk banyak customer rental.

## 3. Target Pengguna
### Pelanggan
- Mencari mobil yang tersedia.
- Booking dengan atau tanpa sopir.
- Upload KTP.
- Cek status booking.
- Beri testimoni setelah selesai sewa.

### Admin / Operator Tenant
- Mengelola armada.
- Mengelola driver.
- Memproses booking.
- Memblokir jadwal mobil untuk servis.
- Mencatat pengeluaran.
- Mengelola testimoni dan konten landing page.

### Superadmin / Owner SaaS
- Mengelola tenant dan subscription.
- Melihat status tenant secara global.
- Menyiapkan provisioning tenant baru.

## 4. Scope Fitur
### Publik
- Landing page
- Katalog mobil
- Detail mobil
- Booking online
- Upload foto KTP
- Cek status booking
- Testimoni pelanggan
- Konten dinamis via admin

### Admin
- Dashboard statistik
- CRUD mobil
- CRUD sopir
- Manajemen booking
- Manajemen jadwal blokir / servis
- Manajemen pengeluaran
- Manajemen testimoni
- CMS landing page
- Pengaturan website
- Manajemen user admin/staf

### SaaS
- Multi-tenant
- Subscription per tenant
- Isolasi data tenant per database
- Base untuk scaling ke billing recurring

## 5. User Stories
### Pelanggan
- Sebagai pelanggan, saya ingin mencari mobil berdasarkan kategori, transmisi, kapasitas, dan harga.
- Sebagai pelanggan, saya ingin melihat detail mobil dan foto-fotonya.
- Sebagai pelanggan, saya ingin booking online dengan cepat.
- Sebagai pelanggan, saya ingin mengunggah KTP saat booking.
- Sebagai pelanggan, saya ingin mengecek status booking dengan kode booking.
- Sebagai pelanggan, saya ingin memberi ulasan setelah selesai sewa.

### Admin
- Sebagai admin, saya ingin melihat ringkasan booking dan pendapatan.
- Sebagai admin, saya ingin menambah/mengubah data mobil dan foto.
- Sebagai admin, saya ingin mengelola jadwal driver.
- Sebagai admin, saya ingin memproses booking dari pending hingga selesai.
- Sebagai admin, saya ingin memblokir mobil untuk servis agar tidak bisa dipesan.
- Sebagai admin, saya ingin mencatat pengeluaran operasional.
- Sebagai admin, saya ingin mengatur isi landing page dari dashboard.

### SaaS Owner
- Sebagai owner, saya ingin tiap tenant punya data terisolasi.
- Sebagai owner, saya ingin mengaktifkan subscription tenant.
- Sebagai owner, saya ingin menambah tenant baru dengan provisioning otomatis.

## 6. Business Rules
- Booking harus menolak konflik jadwal mobil.
- Booking harus menolak konflik jadwal driver bila driver dipilih.
- Booking harus menolak tanggal yang overlap dengan blokir servis.
- Total harga dihitung dari durasi sewa + biaya driver.
- Setiap booking punya kode unik.
- Testimoni harus di-approve admin sebelum tampil publik.
- Konten landing page wajib bisa diubah tanpa hardcode.

## 7. Out of Scope Awal
- Payment gateway otomatis.
- Aplikasi mobile native.
- Integrasi GPS tracking.
- Dynamic pricing berbasis AI.
- Rental motor / alat berat.

## 8. Asumsi
- Tenant login terpisah dari publik.
- Tenant memakai domain/subdomain sendiri.
- Database tenant dipisahkan oleh `stancl/tenancy`.
- Upload file disimpan di storage Laravel.

## 9. Success Metrics
- Booking masuk via website.
- Penurunan booking manual via WhatsApp.
- Admin bisa memproses booking lebih cepat.
- Tidak ada double booking yang lolos.
- Landing page bisa diedit tanpa ubah kode.
