# RenCar UI/UX DESIGN

## 1. Desain Sistem
- **Primary Color:** Blue (Laravel default, bisa dikustomisasi).
- **Typography:** Sans-serif (Inter atau font default sistem).
- **Komponen:** Tailwind CSS utilities + HeadlessUI (untuk modal/dropdown).
- **Responsif:** Mobile-first design (grid system).

## 2. Navigasi
### Sisi Publik (GuestLayout)
- Header: Logo (RenCar), menu (Beranda, Katalog, Testimoni, Cek Status), Tombol "Login Admin".
- Footer: Ringkasan, Link utama, Kontak, Sosmed.

### Sisi Admin (AuthenticatedLayout)
- Sidebar/Topnav: Link ke Dashboard, Armada, Sopir, Booking, Pengeluaran, Testimoni, Jadwal Blokir, Pengaturan.

## 3. Wireframe Deskripsi

### Dashboard Admin
- **Stats:** Grid 5 kolom (Total Booking, Pending, Pendapatan, Mobil Aktif, Total Mobil).
- **Recent Bookings:** Tabel dengan highlight status (Pending=kuning, Active=hijau, dsb).
- **Revenue Chart:** Bar chart/progress bar pendapatan 6 bulan.

### Catalog (Publik)
- **Filter:** Sidebar/top panel filter (Search, Kategori, Transmisi, Sort By).
- **Card:** Grid mobil (Foto, Nama, Kapasitas, Transmisi, Harga/hari, Status).

### Booking Form (Publik)
- Form multi-field.
- Preview harga real-time (butuh JS/Inertia state).
- Warning/Pesan konflik jika jadwal bentrok.

### Detail Mobil (Publik)
- Foto utama besar + thumbnail.
- Deskripsi lengkap.
- Review/Testimoni dari pelanggan lain.

## 4. UX Patterns
- **Validasi:** Semua form menggunakan validasi server-side Laravel + Inertia flash messages (errors).
- **Loading State:** Tombol disable saat submit (processing).
- **Kalkulasi Harga:** Perubahan input tanggal/driver otomatis memicu fetch ke backend `BookingService` dan memperbarui preview harga.
