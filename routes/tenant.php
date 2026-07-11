<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use App\Http\Controllers\ProfileController;

$tenantDomain = '{tenant}.'.config('app.central_domain', 'rentivo.my.id');

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->domain($tenantDomain)->group(function () {
    require __DIR__.'/auth.php';

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // Public routes
    Route::get('/', [\App\Http\Controllers\Public\HomeController::class, 'index'])->name('public.home');
    
    // Catalog
    Route::get('/katalog', [\App\Http\Controllers\Public\CatalogController::class, 'index'])->name('public.catalog');
    Route::get('/mobil/{car}', [\App\Http\Controllers\Public\CatalogController::class, 'show'])->name('public.cars.show');
    
    // Booking
    Route::get('/booking', [\App\Http\Controllers\Public\BookingController::class, 'create'])->name('public.booking');
    Route::post('/booking', [\App\Http\Controllers\Public\BookingController::class, 'store'])->name('public.booking.store');
    Route::get('/booking/success', [\App\Http\Controllers\Public\BookingController::class, 'success'])->name('public.booking.success');
    Route::get('/cek-status', [\App\Http\Controllers\Public\BookingController::class, 'checkStatus'])->name('public.booking.check-status');
    Route::post('/cek-status', [\App\Http\Controllers\Public\BookingController::class, 'getStatus'])->name('public.booking.get-status');
    Route::post('/booking/calculate-price', [\App\Http\Controllers\Public\BookingController::class, 'calculatePrice'])->name('public.booking.calculate-price');
    
    // Testimonials
    Route::get('/testimoni', [\App\Http\Controllers\Public\TestimonialController::class, 'index'])->name('public.testimonials');
    Route::get('/testimoni/create', [\App\Http\Controllers\Public\TestimonialController::class, 'create'])->name('public.testimonials.create');
    Route::post('/testimoni', [\App\Http\Controllers\Public\TestimonialController::class, 'store'])->name('public.testimonials.store');
});

// Admin routes (require authentication)
Route::middleware([
    'web',
    'auth',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->domain($tenantDomain)->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    
    // Cars management
    Route::get('/mobil', [\App\Http\Controllers\Admin\CarController::class, 'index'])->name('cars.index');
    Route::get('/mobil/create', [\App\Http\Controllers\Admin\CarController::class, 'create'])->name('cars.create');
    Route::post('/mobil', [\App\Http\Controllers\Admin\CarController::class, 'store'])->name('cars.store');
    Route::get('/mobil/{car}', [\App\Http\Controllers\Admin\CarController::class, 'show'])->name('cars.show');
    Route::get('/mobil/{car}/edit', [\App\Http\Controllers\Admin\CarController::class, 'edit'])->name('cars.edit');
    Route::put('/mobil/{car}', [\App\Http\Controllers\Admin\CarController::class, 'update'])->name('cars.update');
    Route::delete('/mobil/{car}', [\App\Http\Controllers\Admin\CarController::class, 'destroy'])->name('cars.destroy');
    
    // Car photos
    Route::delete('/foto/{photo}', [\App\Http\Controllers\Admin\CarController::class, 'deletePhoto'])->name('photos.delete');
    Route::post('/foto/{photo}/set-primary', [\App\Http\Controllers\Admin\CarController::class, 'setPrimaryPhoto'])->name('photos.set-primary');
    
    // Drivers management
    Route::get('/sopir', [\App\Http\Controllers\Admin\DriverController::class, 'index'])->name('drivers.index');
    Route::get('/sopir/create', [\App\Http\Controllers\Admin\DriverController::class, 'create'])->name('drivers.create');
    Route::post('/sopir', [\App\Http\Controllers\Admin\DriverController::class, 'store'])->name('drivers.store');
    Route::get('/sopir/{driver}/edit', [\App\Http\Controllers\Admin\DriverController::class, 'edit'])->name('drivers.edit');
    Route::put('/sopir/{driver}', [\App\Http\Controllers\Admin\DriverController::class, 'update'])->name('drivers.update');
    Route::delete('/sopir/{driver}', [\App\Http\Controllers\Admin\DriverController::class, 'destroy'])->name('drivers.destroy');
    
    // Bookings management
    Route::get('/booking', [\App\Http\Controllers\Admin\BookingController::class, 'index'])->name('bookings.index');
    Route::get('/booking/create', [\App\Http\Controllers\Admin\BookingController::class, 'create'])->name('bookings.create');
    Route::post('/booking', [\App\Http\Controllers\Admin\BookingController::class, 'store'])->name('bookings.store');
    Route::post('/booking/bulk-update', [\App\Http\Controllers\Admin\BookingController::class, 'bulkUpdate'])->name('bookings.bulk-update');
    Route::get('/booking/{booking}/edit', [\App\Http\Controllers\Admin\BookingController::class, 'edit'])->name('bookings.edit');
    Route::put('/booking/{booking}', [\App\Http\Controllers\Admin\BookingController::class, 'update'])->name('bookings.update');
    Route::get('/booking/{booking}', [\App\Http\Controllers\Admin\BookingController::class, 'show'])->name('bookings.show');
    
    // Booking actions
    Route::post('/booking/{booking}/approve', [\App\Http\Controllers\Admin\BookingController::class, 'approve'])->name('bookings.approve');
    Route::post('/booking/{booking}/activate', [\App\Http\Controllers\Admin\BookingController::class, 'activate'])->name('bookings.activate');
    Route::post('/booking/{booking}/complete', [\App\Http\Controllers\Admin\BookingController::class, 'complete'])->name('bookings.complete');
    Route::post('/booking/{booking}/cancel', [\App\Http\Controllers\Admin\BookingController::class, 'cancel'])->name('bookings.cancel');
    
    // Expenses management
    Route::get('/pengeluaran', [\App\Http\Controllers\Admin\ExpenseController::class, 'index'])->name('expenses.index');
    Route::get('/pengeluaran/create', [\App\Http\Controllers\Admin\ExpenseController::class, 'create'])->name('expenses.create');
    Route::post('/pengeluaran', [\App\Http\Controllers\Admin\ExpenseController::class, 'store'])->name('expenses.store');
    Route::get('/pengeluaran/{expense}/edit', [\App\Http\Controllers\Admin\ExpenseController::class, 'edit'])->name('expenses.edit');
    Route::put('/pengeluaran/{expense}', [\App\Http\Controllers\Admin\ExpenseController::class, 'update'])->name('expenses.update');
    Route::delete('/pengeluaran/{expense}', [\App\Http\Controllers\Admin\ExpenseController::class, 'destroy'])->name('expenses.destroy');
    
    // Testimonials management
    Route::get('/testimoni', [\App\Http\Controllers\Admin\TestimonialController::class, 'index'])->name('testimonials.index');
    Route::post('/testimoni/{testimonial}/approve', [\App\Http\Controllers\Admin\TestimonialController::class, 'approve'])->name('testimonials.approve');
    Route::post('/testimoni/{testimonial}/reject', [\App\Http\Controllers\Admin\TestimonialController::class, 'reject'])->name('testimonials.reject');
    Route::delete('/testimoni/{testimonial}', [\App\Http\Controllers\Admin\TestimonialController::class, 'destroy'])->name('testimonials.destroy');
    
    // Car blocks (maintenance schedule)
    Route::get('/jadwal-blokir', [\App\Http\Controllers\Admin\CarBlockController::class, 'index'])->name('car-blocks.index');
    Route::get('/jadwal-blokir/create', [\App\Http\Controllers\Admin\CarBlockController::class, 'create'])->name('car-blocks.create');
    Route::post('/jadwal-blokir', [\App\Http\Controllers\Admin\CarBlockController::class, 'store'])->name('car-blocks.store');
    Route::get('/jadwal-blokir/{carBlock}/edit', [\App\Http\Controllers\Admin\CarBlockController::class, 'edit'])->name('car-blocks.edit');
    Route::put('/jadwal-blokir/{carBlock}', [\App\Http\Controllers\Admin\CarBlockController::class, 'update'])->name('car-blocks.update');
    Route::delete('/jadwal-blokir/{carBlock}', [\App\Http\Controllers\Admin\CarBlockController::class, 'destroy'])->name('car-blocks.destroy');
    
    // Settings
    Route::get('/pengaturan', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/pengaturan', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
});
