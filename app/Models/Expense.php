<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Expense extends Model
{
    protected $fillable = [
        'car_id',
        'title',
        'amount',
        'date',
        'category',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'date' => 'date',
    ];

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }

    // scope: by category
    public function scopeMaintenance($query)
    {
        return $query->where('category', 'maintenance');
    }

    public function scopeFuel($query)
    {
        return $query->where('category', 'fuel');
    }
}
