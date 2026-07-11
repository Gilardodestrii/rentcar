# RenCar DATABASE

Aplikasi ini berjalan dalam lingkungan multi-tenant. Definisi tabel di bawah ini merupakan tabel yang ada dalam setiap **Tenant Database**.

## 1. ERD Overview
- Sebuah `Car` memiliki banyak `CarPhoto`.
- Sebuah `Car` memiliki banyak `Booking`.
- Sebuah `Car` memiliki banyak `Expense`.
- Sebuah `Car` memiliki banyak `CarBlock`.
- Sebuah `Driver` memiliki banyak `Booking`.
- Sebuah `Booking` terhubung ke satu `Car` dan satu `Driver` (opsional).
- Sebuah `Booking` dapat memiliki maksimal satu `Testimonial`.
- `SiteSetting` independen (key-value store).

## 2. Table Definitions

### 2.1 cars
Data master armada kendaraan.
- `id`: bigint(20) unsigned, auto_increment
- `brand`: varchar(100)
- `model`: varchar(100)
- `category`: enum('sedan', 'suv', 'mpv', 'hatchback', 'luxury')
- `plate_number`: varchar(20), unique
- `capacity`: int(11)
- `transmission`: enum('manual', 'automatic')
- `price_per_day`: decimal(10,2)
- `status`: enum('available', 'rented', 'maintenance')
- `description`: text, nullable
- `timestamps`

### 2.2 car_photos
Galeri foto armada.
- `id`: bigint(20) unsigned, auto_increment
- `car_id`: bigint(20) unsigned, foreign key to `cars.id`
- `path`: varchar(255)
- `is_primary`: boolean, default false
- `timestamps`

### 2.3 drivers
Data sopir.
- `id`: bigint(20) unsigned, auto_increment
- `name`: varchar(100)
- `phone`: varchar(20)
- `license_number`: varchar(50), unique
- `daily_rate`: decimal(10,2)
- `status`: enum('available', 'unavailable')
- `photo`: varchar(255), nullable
- `timestamps`

### 2.4 bookings
Transaksi pemesanan rental.
- `id`: bigint(20) unsigned, auto_increment
- `booking_code`: varchar(20), unique
- `car_id`: bigint(20) unsigned, foreign key to `cars.id`
- `driver_id`: bigint(20) unsigned, foreign key to `drivers.id`, nullable
- `rental_type`: enum('leasing', 'with_driver')
- `customer_name`: varchar(100)
- `customer_phone`: varchar(20)
- `customer_email`: varchar(100), nullable
- `ktp_path`: varchar(255), nullable
- `start_date`: date
- `end_date`: date
- `pickup_location`: varchar(255), nullable
- `dropoff_location`: varchar(255), nullable
- `subtotal`: decimal(10,2) // total biaya mobil
- `driver_fee`: decimal(10,2) // total biaya sopir
- `total_price`: decimal(10,2) // subtotal + driver_fee
- `status`: enum('pending', 'approved', 'active', 'completed', 'cancelled')
- `notes`: text, nullable
- `timestamps`

### 2.5 car_blocks
Jadwal blokir kendaraan (maintenance/servis).
- `id`: bigint(20) unsigned, auto_increment
- `car_id`: bigint(20) unsigned, foreign key to `cars.id`
- `start_date`: date
- `end_date`: date
- `reason`: text
- `is_recurring`: boolean, default false
- `recurrence_end`: date, nullable
- `timestamps`

### 2.6 expenses
Pengeluaran operasional per armada.
- `id`: bigint(20) unsigned, auto_increment
- `car_id`: bigint(20) unsigned, foreign key to `cars.id`
- `title`: varchar(200)
- `amount`: decimal(10,2)
- `date`: date
- `category`: enum('maintenance', 'fuel', 'insurance', 'tax', 'other')
- `notes`: text, nullable
- `timestamps`

### 2.7 testimonials
Ulasan pelanggan.
- `id`: bigint(20) unsigned, auto_increment
- `booking_id`: bigint(20) unsigned, foreign key to `bookings.id`
- `car_id`: bigint(20) unsigned, foreign key to `cars.id`
- `customer_name`: varchar(100)
- `rating`: tinyint
- `comment`: text
- `status`: enum('pending', 'approved', 'rejected')
- `timestamps`

### 2.8 site_settings
Pengaturan konten dinamis website tenant.
- `id`: bigint(20) unsigned, auto_increment
- `key`: varchar(100), unique
- `value`: text, nullable (JSON casted di Model)
- `timestamps`

## 3. Indexing Strategy
Index telah ditambahkan pada tabel untuk query kritis:
- `bookings`: `['car_id', 'start_date', 'end_date']` dan `['driver_id', 'start_date', 'end_date']` untuk optimasi cek konflik ketersediaan.
- `car_blocks`: `['car_id', 'start_date', 'end_date']` untuk optimasi cek jadwal servis.
