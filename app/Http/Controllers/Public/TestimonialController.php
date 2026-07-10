<?php

namespace App\Http\Controllers\Public;

use App\Models\Testimonial;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function create(Request $request): Response
    {
        $bookingCode = $request->input('booking_code');
        $booking = null;

        if ($bookingCode) {
            $booking = Booking::where('booking_code', $bookingCode)
                ->where('status', 'completed')
                ->with('car')
                ->first();

            // Check if testimonial already exists
            if ($booking && $booking->testimonial) {
                return redirect()->route('public.home')
                    ->with('info', 'Anda sudah memberikan testimoni untuk booking ini');
            }
        }

        return inertia('Public/CreateTestimonial', [
            'booking' => $booking ? [
                'id' => $booking->id,
                'booking_code' => $booking->booking_code,
                'car' => [
                    'id' => $booking->car->id,
                    'brand' => $booking->car->brand,
                    'model' => $booking->car->model,
                ],
                'customer_name' => $booking->customer_name,
            ] : null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'booking_code' => 'required|exists:bookings,booking_code',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:10|max:500',
        ]);

        $booking = Booking::where('booking_code', $validated['booking_code'])
            ->where('status', 'completed')
            ->firstOrFail();

        // Check if testimonial already exists
        if ($booking->testimonial) {
            return back()->withErrors(['error' => 'Anda sudah memberikan testimoni untuk booking ini']);
        }

        Testimonial::create([
            'booking_id' => $booking->id,
            'car_id' => $booking->car_id,
            'customer_name' => $booking->customer_name,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'status' => 'pending',
        ]);

        return redirect()->route('public.home')
            ->with('success', 'Terima kasih atas testimoni Anda! Testimoni akan ditampilkan setelah disetujui admin.');
    }

    public function index(): Response
    {
        $testimonials = Testimonial::with('car')
            ->approved()
            ->latest()
            ->paginate(12)
            ->through(fn($t) => [
                'id' => $t->id,
                'customer_name' => $t->customer_name,
                'rating' => $t->rating,
                'comment' => $t->comment,
                'car' => $t->car ? "{$t->car->brand} {$t->car->model}" : null,
                'created_at' => $t->created_at->format('d M Y'),
            ]);

        return inertia('Public/Testimonials', [
            'testimonials' => $testimonials,
        ]);
    }
}
