# RenCar ARCHITECTURE

## 1. High-Level Diagram

```text
User Browser
    |
    | HTTP/HTTPS
    |
=========================
Nginx/Apache (Web Server)
=========================
    |
    |
[Laravel Routing]
    |-- /                 -> Public Home
    |-- /katalog          -> Public Catalog
    |-- /booking          -> Public Booking
    |-- /admin/*          -> Admin Dashboard
    |
[Middleware]
    |-- web
    |-- InitializeTenancyByDomain
    |-- PreventAccessFromCentralDomains
    |-- auth (for admin)
    |
[Controllers]
    |-- Public: Home, Catalog, Booking, Testimonial
    |-- Admin: Dashboard, Car, Driver, Booking, Expense, Testimonial, Setting, CarBlock
    |
[Services]
    |-- BookingService (conflict validation, calculation, code gen)
    |
[Models / Eloquent]
    |-- Car, Driver, Booking, Expense, Testimonial, SiteSetting, CarBlock
    |
[Stancl/Tenancy Database Router]
    |
=========================
MySQL
=========================
    |-- Central DB (tenants, domains, users)
    |-- Tenant DB 1 (cars, bookings)
    |-- Tenant DB 2 (cars, bookings)
```

## 2. Tech Stack

*   **Backend:** Laravel 11.
*   **Frontend:** React 18, Inertia.js 2.
*   **Styling:** Tailwind CSS 3.
*   **Database:** MySQL.
*   **Multi-Tenancy:** `stancl/tenancy` v3 (Database Isolation).
*   **Auth:** Laravel Breeze (Inertia React).
*   **Bundler:** Vite.

## 3. Multi-Tenancy Design

Aplikasi menggunakan pola *database-per-tenant* yang difasilitasi oleh `stancl/tenancy`.

1.  **Central DB:** Menyimpan tabel `tenants`, `domains`, `users` (untuk SaaS owner).
2.  **Tenant DB:** Menyimpan seluruh data operasional rental (mobil, booking, driver, setting).
3.  **Routing:** Menggunakan `InitializeTenancyByDomain` untuk menentukan tenant mana yang aktif berdasarkan hostname request.
4.  **Filesystem:** Direktori storage dipisahkan otomatis per tenant (`storage/app/tenants/{id}/`).

## 4. Directory Structure

Struktur kunci yang relevan dengan pengembangan:

*   `app/Http/Controllers/Public/`: Controller untuk halaman publik.
*   `app/Http/Controllers/Admin/`: Controller untuk dashboard operasional tenant.
*   `app/Models/`: Model Eloquent untuk entitas rental.
*   `app/Services/`: Logika bisnis terpusat (misal `BookingService`).
*   `database/migrations/tenant/`: Migrasi tabel spesifik tenant (berjalan via `php artisan tenancy:migrate`).
*   `resources/js/Pages/Public/`: Komponen React untuk halaman landing/katalog.
*   `resources/js/Pages/Admin/`: Komponen React untuk dashboard admin.
*   `resources/js/Layouts/`: Layout React (`GuestLayout`, `AuthenticatedLayout`).
*   `routes/tenant.php`: Definisi rute untuk aplikasi tenant (publik dan admin).

## 5. Request Lifecycle & Critical Flows

### 5.1 Booking Flow (Public)
1.  User akses `/booking`.
2.  `BookingController@create` me-render form via Inertia.
3.  User isi form (dates, car, driver, KTP).
4.  Form hit `/booking/calculate-price` secara asinkron untuk preview harga dan cek konflik awal.
5.  User submit ke `/booking` POST.
6.  `BookingController@store` memanggil `BookingService::createBooking()`.
7.  `BookingService` memvalidasi konflik final (overlap waktu, blokir servis).
8.  Jika valid, booking disimpan, redirect ke `/booking/success`.

### 5.2 Admin Booking Approval
1.  Admin masuk ke `/admin/booking`.
2.  Admin melihat booking pending, klik "Approve".
3.  Status booking jadi `approved`.
4.  Saat mobil diambil, admin klik "Activate". Status booking jadi `active`, status mobil jadi `rented`.
5.  Saat mobil dikembalikan, admin klik "Complete". Status booking jadi `completed`, status mobil jadi `available`.

## 6. Deployment Architecture (aaPanel)
1.  Source code berada di `/www/wwwroot/app.domain.com`.
2.  Document root Nginx diarahkan ke `/www/wwwroot/app.domain.com/public`.
3.  PHP-FPM dijalankan via PHP bawaan aaPanel (misal PHP 8.3).
4.  Database MySQL jalan lokal.
5.  `php artisan migrate` dijalankan untuk central db.
6.  `php artisan tenancy:migrate` dijalankan untuk semua tenant db.
7.  Node.js diperlukan saat build (`npm ci && npm run build`), setelah itu hanya butuh Nginx+PHP untuk melayani file static Vite di `public/build/`.
