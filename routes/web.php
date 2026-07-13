<?php

use App\Http\Controllers\SubscriptionController;
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

    Route::get('/daftar', [TenantSignupController::class, 'create'])->name('tenants.create');
    Route::post('/daftar', [TenantSignupController::class, 'store'])->name('tenants.store');

    // Subscription routes
    Route::post('/subscribe', [SubscriptionController::class, 'store'])->name('subscribe');
    Route::get('/subscribe/success', [SubscriptionController::class, 'success'])->name('subscribe.success');
    Route::get('/subscribe/cancel', [SubscriptionController::class, 'cancel'])->name('subscribe.cancel');
});
