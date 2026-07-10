<?php

namespace App\Http\Controllers\Admin;

use App\Models\Booking;
use App\Models\Car;
use App\Models\Driver;
use App\Services\BookingService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;

class BookingController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Booking::with(['car', 'driver']);

        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('booking_code', 'like', "%{$search}%")
                  ->orWhere('customer_name', 'like', "%{$search}%")
                  ->orWhere('customer_phone', 'like', "%{$search}%");
            });
        }

        $bookings = $query->latest()->paginate(15)->through(fn($b) => [
            'id' => $b->id,
            'booking_code' => $b->booking_code,
            'customer_name' => $b->customer_name,
            'customer_phone' => $b->customer_phone,
            'car' => $b->car ? [
                'id' => $b->car->id,
                'brand' => $b->car->brand,
                'model' => $b->car->model,
                'plate_number' => $b->car->plate_number,
            ] : null,
            'driver' => $b->driver ? [
                'id' => $b->driver->id,
                'name' => $b->driver->name,
            ] : null,
            'start_date' => $b->start_date->format('Y-m-d'),
            'end_date' => $b->end_date->format('Y-m-d'),
            'total_price' => $b->total_price,
            'status' => $b->status,
            'created_at' => $b->created_at->format('Y-m-d H:i'),
        ]);

        return inertia('Admin/Bookings/Index', [
            'bookings' => $bookings,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function show(Booking $booking): Response
    {
        $booking->load(['car.primaryPhoto', 'driver']);

        return inertia('Admin/Bookings/Show', [
            'booking' => [
                'id' => $booking->id,
                'booking_code' => $booking->booking_code,
                'rental_type' => $booking->rental_type,
                'customer_name' => $booking->customer_name,
                'customer_phone' => $booking->customer_phone,
                'customer_email' => $booking->customer_email,
                'ktp_path' => $booking->ktp_path ? asset('storage/' . $booking->ktp_path) : null,
                'car' => $booking->car ? [
                    'id' => $booking->car->id,
                    'brand' => $booking->car->brand,
                    'model' => $booking->car->model,
                    'plate_number' => $booking->car->plate_number,
                    'photo' => $booking->car->primaryPhoto ? asset('storage/' . $booking->car->primaryPhoto->path) : null,
                ] : null,
                'driver' => $booking->driver ? [
                    'id' => $booking->driver->id,
                    'name' => $booking->driver->name,
                    'phone' => $booking->driver->phone,
                ] : null,
                'start_date' => $booking->start_date->format('Y-m-d'),
                'end_date' => $booking->end_date->format('Y-m-d'),
                'duration' => $booking->durationInDays(),
                'pickup_location' => $booking->pickup_location,
                'dropoff_location' => $booking->dropoff_location,
                'subtotal' => $booking->subtotal,
                'driver_fee' => $booking->driver_fee,
                'total_price' => $booking->total_price,
                'status' => $booking->status,
                'notes' => $booking->notes,
                'created_at' => $booking->created_at->format('Y-m-d H:i'),
            ],
        ]);
    }

    public function create(): Response
    {
        $cars = Car::available()->get()->map(fn($c) => [
            'id' => $c->id,
            'label' => "{$c->brand} {$c->model} ({$c->plate_number})",
            'price_per_day' => $c->price_per_day,
        ]);

        $drivers = Driver::where('status', 'available')->get()->map(fn($d) => [
            'id' => $d->id,
            'label' => "{$d->name} - Rp " . number_format($d->daily_rate, 0, ',', '.') . '/hari',
            'daily_rate' => $d->daily_rate,
        ]);

        return inertia('Admin/Bookings/Create', [
            'cars' => $cars,
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
            'ktp_path' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
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
            return back()->withErrors(['error' => implode(', ', $result['errors'])]);
        }

        return redirect()->route('admin.bookings.index')
            ->with('success', 'Booking berhasil dibuat dengan kode: ' . $result['booking']->booking_code);
    }

    public function approve(Booking $booking)
    {
        if ($booking->status !== 'pending') {
            return back()->withErrors(['error' => 'Hanya booking dengan status pending yang bisa disetujui']);
        }

        $booking->update(['status' => 'approved']);

        return back()->with('success', 'Booking berhasil disetujui');
    }

    public function activate(Booking $booking)
    {
        if ($booking->status !== 'approved') {
            return back()->withErrors(['error' => 'Hanya booking yang sudah disetujui yang bisa diaktifkan']);
        }

        $booking->update(['status' => 'active']);
        $booking->car->update(['status' => 'rented']);

        return back()->with('success', 'Booking berhasil diaktifkan, mobil sekarang dalam status disewa');
    }

    public function complete(Booking $booking)
    {
        if ($booking->status !== 'active') {
            return back()->withErrors(['error' => 'Hanya booking aktif yang bisa diselesaikan']);
        }

        $booking->update(['status' => 'completed']);
        $booking->car->update(['status' => 'available']);

        return back()->with('success', 'Booking berhasil diselesaikan, mobil kembali tersedia');
    }

    public function cancel(Booking $booking)
    {
        if (in_array($booking->status, ['completed', 'cancelled'])) {
            return back()->withErrors(['error' => 'Booking ini tidak bisa dibatalkan']);
        }

        $booking->update(['status' => 'cancelled']);

        // Make car available again if it was rented
        if ($booking->car->status === 'rented') {
            $booking->car->update(['status' => 'available']);
        }

        return back()->with('success', 'Booking berhasil dibatalkan');
    }
}
