<?php

use App\Http\Controllers\TenantSignupController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'baseDomain' => config('app.central_domain'),
    ]);
});

Route::get('/daftar', [TenantSignupController::class, 'create'])->name('tenants.create');
Route::post('/daftar', [TenantSignupController::class, 'store'])->name('tenants.store');
