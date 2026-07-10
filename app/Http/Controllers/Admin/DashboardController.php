<?php

namespace App\Http\Controllers\Admin;

use App\Models\Booking;
use App\Models\Car;
use App\Models\Expense;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalBookings = Booking::count();
        $pendingBookings = Booking::pending()->count();
        $totalRevenue = Booking::where('status', '!=', 'cancelled')->sum('total_price');
        $activeCars = Car::available()->count();
        $totalCars = Car::count();

        // Recent bookings
        $recentBookings = Booking::with(['car', 'driver'])
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($b) => [
                'id' => $b->id,
                'booking_code' => $b->booking_code,
                'customer_name' => $b->customer_name,
                'car' => $b->car ? ['id' => $b->car->id, 'brand' => $b->car->brand, 'model' => $b->car->model] : null,
                'start_date' => $b->start_date->format('Y-m-d'),
                'end_date' => $b->end_date->format('Y-m-d'),
                'total_price' => $b->total_price,
                'status' => $b->status,
            ]);

        // Monthly revenue (last 6 months)
        $monthlyRevenue = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $revenue = Booking::where('status', '!=', 'cancelled')
                ->whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->sum('total_price');
            $monthlyRevenue[] = [
                'month' => $month->format('M Y'),
                'revenue' => $revenue,
            ];
        }

        return inertia('Admin/Dashboard', [
            'stats' => [
                'total_bookings' => $totalBookings,
                'pending_bookings' => $pendingBookings,
                'total_revenue' => $totalRevenue,
                'active_cars' => $activeCars,
                'total_cars' => $totalCars,
            ],
            'recentBookings' => $recentBookings,
            'monthlyRevenue' => $monthlyRevenue,
        ]);
    }
}
