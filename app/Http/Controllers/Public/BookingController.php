<?php

namespace App\Http\Controllers\Public;

use App\Models\Booking;
use App\Models\Car;
use App\Models\Driver;
use App\Services\BookingService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;

class BookingController extends Controller
{
    public function create(Request $request): Response
    {
        $carId = $request->input('car_id');
        $car = null;

        if ($carId) {
            $car = Car::with('primaryPhoto')->findOrFail($carId);
        }

        // Available drivers
        $drivers = Driver::where('status', 'available')->get()->map(fn($d) => [
            'id' => $d->id,
            'name' => $d->name,
            'daily_rate' => $d->daily_rate,
            'label' => "{$d->name} - Rp " . number_format($d->daily_rate, 0, ',', '.') . '/hari',
        ]);

        return inertia('Public/Booking', [
            'car' => $car ? [
                'id' => $car->id,
                'brand' => $car->brand,
                'model' => $car->model,
                'price_per_day' => $car->price_per_day,
                'photo' => $car->primaryPhoto ? asset('storage/' . $car->primaryPhoto->path) : null,
            ] : null,
            'drivers' => $drivers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'driver_id' => 'nullable|exists:drivers,id',
            'customer_name' => 'required|string|max:100',
            'customer_phone' => 'required|string|max:20',
            'customer_email' => 'nullable|email|max:100',
            'ktp_path' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'pickup_location' => 'nullable|string|max:255',
            'dropoff_location' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:500',
        ]);

        // Handle KTP upload
        if ($request->hasFile('ktp_path')) {
            $validated['ktp_path'] = $request->file('ktp_path')->store('ktp', 'public');
        }

        $result = BookingService::createBooking($validated);

        if (!$result['success']) {
            return back()->withErrors(['error' => implode(', ', $result['errors'])])->withInput();
        }

        return redirect()->route('public.booking.success', ['code' => $result['booking']->booking_code])
            ->with('success', 'Booking berhasil dibuat!');
    }

    public function success(Request $request): Response
    {
        $bookingCode = $request->input('code');
        $booking = Booking::where('booking_code', $bookingCode)
            ->with(['car.primaryPhoto', 'driver'])
            ->firstOrFail();

        return inertia('Public/BookingSuccess', [
            'booking' => [
                'id' => $booking->id,
                'booking_code' => $booking->booking_code,
                'customer_name' => $booking->customer_name,
                'customer_phone' => $booking->customer_phone,
                'car' => [
                    'brand' => $booking->car->brand,
                    'model' => $booking->car->model,
                    'photo' => $booking->car->primaryPhoto ? asset('storage/' . $booking->car->primaryPhoto->path) : null,
                ],
                'driver' => $booking->driver ? [
                    'name' => $booking->driver->name,
                ] : null,
                'start_date' => $booking->start_date->format('d M Y'),
                'end_date' => $booking->end_date->format('d M Y'),
                'duration' => $booking->durationInDays(),
                'subtotal' => $booking->subtotal,
                'driver_fee' => $booking->driver_fee,
                'total_price' => $booking->total_price,
                'status' => $booking->status,
            ],
        ]);
    }

    public function checkStatus(): Response
    {
        return inertia('Public/CheckStatus');
    }

    public function getStatus(Request $request)
    {
        $validated = $request->validate([
            'booking_code' => 'required|string',
        ]);

        $booking = Booking::where('booking_code', $validated['booking_code'])
            ->with(['car', 'driver'])
            ->first();

        if (!$booking) {
            return back()->withErrors(['error' => 'Kode booking tidak ditemukan']);
        }

        return inertia('Public/BookingStatus', [
            'booking' => [
                'id' => $booking->id,
                'booking_code' => $booking->booking_code,
                'customer_name' => $booking->customer_name,
                'customer_phone' => $booking->customer_phone,
                'car' => [
                    'brand' => $booking->car->brand,
                    'model' => $booking->car->model,
                    'plate_number' => $booking->car->plate_number,
                ],
                'driver' => $booking->driver ? [
                    'name' => $booking->driver->name,
                    'phone' => $booking->driver->phone,
                ] : null,
                'rental_type' => $booking->rental_type,
                'start_date' => $booking->start_date->format('d M Y'),
                'end_date' => $booking->end_date->format('d M Y'),
                'duration' => $booking->durationInDays(),
                'pickup_location' => $booking->pickup_location,
                'dropoff_location' => $booking->dropoff_location,
                'subtotal' => $booking->subtotal,
                'driver_fee' => $booking->driver_fee,
                'total_price' => $booking->total_price,
                'status' => $booking->status,
                'created_at' => $booking->created_at->format('d M Y H:i'),
            ],
        ]);
    }

    // Calculate price API for live preview
    public function calculatePrice(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'driver_id' => 'nullable|exists:drivers,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $startDate = \Carbon\Carbon::parse($validated['start_date']);
        $endDate = \Carbon\Carbon::parse($validated['end_date']);

        $priceData = BookingService::calculatePrice(
            $validated['car_id'],
            $validated['driver_id'] ?? null,
            $startDate,
            $endDate
        );

        // Check conflicts
        $conflicts = BookingService::hasBookingConflict(
            $validated['car_id'],
            $validated['driver_id'] ?? null,
            $startDate,
            $endDate
        );

        return response()->json([
            'price' => $priceData,
            'conflicts' => $conflicts,
            'has_conflict' => !empty($conflicts),
        ]);
    }
}
