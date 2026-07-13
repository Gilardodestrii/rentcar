<?php

use App\Http\Controllers\PakasirController;
use App\Http\Controllers\TenantSignupController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Central domain routes (landing page)
Route::domain(config('app.central_domain'))->group(function () {
    Route::get('/', function () {
        return Inertia::render('Landing/Index');
    })->name('landing');

    Route::get('/harga', function () {
        return Inertia::render('Landing/Index', ['scrollTo' => 'pricing']);
    })->name('pricing');

    // Pakasir Payment Routes
    Route::post('/daftar', [TenantSignupController::class, 'store'])->name('tenants.store');
    Route::post('/pakasir/create', [PakasirController::class, 'createTransaction'])->name('pakasir.create');
    Route::post('/pakasir/callback', [PakasirController::class, 'callback'])->name('pakasir.callback');
    Route::get('/pakasir/return', [PakasirController::class, 'return'])->name('pakasir.return');
});

