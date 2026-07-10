<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Car;
use App\Models\CarBlock;
use Carbon\CarbonInterface;

class BookingService
{
    // Generate unique booking code
    public static function generateBookingCode(): string
    {
        do {
            $code = 'BN-' . strtoupper(substr(uniqid(), -8));
            $exists = Booking::where('booking_code', $code)->exists();
        } while ($exists);

        return $code;
    }

    // Calculate price: base per day + driver fee if applicable
    public static function calculatePrice(int $carId, ?int $driverId, CarbonInterface $startDate, CarbonInterface $endDate): array
    {
        $car = Car::findOrFail($carId);

        $duration = $startDate->diffInDays($endDate) + 1;
        $subtotal = $car->price_per_day * $duration;

        $driverFee = 0;
        if ($driverId) {
            $driver = \App\Models\Driver::findOrFail($driverId);
            $driverFee = $driver->daily_rate * $duration;
        }

        $total = $subtotal + $driverFee;

        return [
            'duration' => $duration,
            'price_per_day' => $car->price_per_day,
            'driver_daily_rate' => $driverId ? \App\Models\Driver::find($driverId)->daily_rate : null,
            'subtotal' => $subtotal,
            'driver_fee' => $driverFee,
            'total_price' => $total,
        ];
    }

    // Check for booking conflicts (customer booking vs driver availability)
    public static function hasBookingConflict(int $carId, ?int $driverId, CarbonInterface $startDate, CarbonInterface $endDate): array
    {
        $conflicts = [];

        // Check car availability
        $carConflict = Booking::where('car_id', $carId)
            ->where('status', '!=', 'cancelled')
            ->where(function ($q) use ($startDate, $endDate) {
                $q->whereBetween('start_date', [$startDate, $endDate])
                  ->orWhereBetween('end_date', [$startDate, $endDate])
                  ->orWhere(function ($q2) use ($startDate, $endDate) {
                      $q2->where('start_date', '<=', $startDate)
                         ->where('end_date', '>=', $endDate);
                  });
            })
            ->exists();

        if ($carConflict) {
            $conflicts[] = 'Mobil tidak tersedia pada periode tersebut';
        }

        // Check driver availability
        if ($driverId) {
            $driverConflict = Booking::where('driver_id', $driverId)
                ->where('status', '!=', 'cancelled')
                ->where('status', '!=', 'completed')
                ->where(function ($q) use ($startDate, $endDate) {
                    $q->whereBetween('start_date', [$startDate, $endDate])
                      ->orWhereBetween('end_date', [$startDate, $endDate])
                      ->orWhere(function ($q2) use ($startDate, $endDate) {
                          $q2->where('start_date', '<=', $startDate)
                             ->where('end_date', '>=', $endDate);
                      });
                })
                ->exists();

            if ($driverConflict) {
                $conflicts[] = 'Sopir tidak tersedia pada periode tersebut';
            }
        }

        // Check car blocks (maintenance)
        $blockConflict = CarBlock::where('car_id', $carId)
            ->where(function ($q) use ($startDate, $endDate) {
                $q->where(function ($q2) use ($startDate, $endDate) {
                    $q2->where('start_date', '<=', $startDate)
                       ->where('end_date', '>=', $endDate);
                })->orWhere(function ($q2) use ($startDate, $endDate) {
                    $q2->where('start_date', '>=', $startDate)
                       ->where('start_date', '<=', $endDate);
                })->orWhere(function ($q2) use ($startDate, $endDate) {
                    $q2->where('end_date', '>=', $startDate)
                       ->where('end_date', '<=', $endDate);
                });
            })
            ->exists();

        if ($blockConflict) {
            $conflicts[] = 'Mobil sedang dalam perawatan/servis';
        }

        return $conflicts;
    }

    // Create booking with validation
    public static function createBooking(array $data): array
    {
        $errors = [];

        // Validate dates
        if (!isset($data['start_date']) || !isset($data['end_date'])) {
            $errors[] = 'Tanggal mulai dan selesai harus diisi';
            return ['success' => false, 'errors' => $errors];
        }

        $startDate = \Carbon\Carbon::parse($data['start_date']);
        $endDate = \Carbon\Carbon::parse($data['end_date']);

        if ($endDate <= $startDate) {
            $errors[] = 'Tanggal selesai harus setelah tanggal mulai';
            return ['success' => false, 'errors' => $errors];
        }

        // Check conflicts
        $conflicts = self::hasBookingConflict(
            $data['car_id'],
            $data['driver_id'] ?? null,
            $startDate,
            $endDate
        );

        if (!empty($conflicts)) {
            $errors = array_merge($errors, $conflicts);
            return ['success' => false, 'errors' => $errors];
        }

        // Calculate price
        $priceData = self::calculatePrice(
            $data['car_id'],
            $data['driver_id'] ?? null,
            $startDate,
            $endDate
        );

        // Create booking
        $booking = Booking::create([
            'booking_code' => self::generateBookingCode(),
            'car_id' => $data['car_id'],
            'driver_id' => $data['driver_id'] ?? null,
            'rental_type' => $data['driver_id'] ? 'with_driver' : 'leasing',
            'customer_name' => $data['customer_name'],
            'customer_phone' => $data['customer_phone'],
            'customer_email' => $data['customer_email'] ?? null,
            'ktp_path' => $data['ktp_path'] ?? null,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'pickup_location' => $data['pickup_location'] ?? null,
            'dropoff_location' => $data['dropoff_location'] ?? null,
            'subtotal' => $priceData['subtotal'],
            'driver_fee' => $priceData['driver_fee'],
            'total_price' => $priceData['total_price'],
            'status' => 'pending',
            'notes' => $data['notes'] ?? null,
        ]);

        return [
            'success' => true,
            'booking' => $booking,
            'price' => $priceData,
        ];
    }
}
