<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Car extends Model
{
    protected $fillable = [
        'brand',
        'model',
        'category',
        'plate_number',
        'capacity',
        'transmission',
        'price_per_day',
        'status',
        'description',
    ];

    protected $casts = [
        'price_per_day' => 'decimal:2',
    ];

    public function photos(): HasMany
    {
        return $this->hasMany(CarPhoto::class);
    }

    public function primaryPhoto()
    {
        return $this->hasOne(CarPhoto::class)->where('is_primary', true);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function blocks(): HasMany
    {
        return $this->hasMany(CarBlock::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    public function testimonials(): HasMany
    {
        return $this->hasMany(Testimonial::class);
    }

    // ponytail: no scope for date availability check; add when filtering catalog by date
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }
}
