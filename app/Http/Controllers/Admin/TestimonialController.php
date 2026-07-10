<?php

namespace App\Http\Controllers\Admin;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Testimonial::with(['booking', 'car']);

        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        $testimonials = $query->latest()->paginate(15)->through(fn($t) => [
            'id' => $t->id,
            'customer_name' => $t->customer_name,
            'rating' => $t->rating,
            'comment' => $t->comment,
            'status' => $t->status,
            'car' => $t->car ? [
                'id' => $t->car->id,
                'brand' => $t->car->brand,
                'model' => $t->car->model,
            ] : null,
            'booking_code' => $t->booking?->booking_code,
            'created_at' => $t->created_at->format('Y-m-d H:i'),
        ]);

        return inertia('Admin/Testimonials/Index', [
            'testimonials' => $testimonials,
            'filters' => $request->only(['status']),
        ]);
    }

    public function approve(Testimonial $testimonial)
    {
        if ($testimonial->status !== 'pending') {
            return back()->withErrors(['error' => 'Hanya testimoni pending yang bisa disetujui']);
        }

        $testimonial->update(['status' => 'approved']);

        return back()->with('success', 'Testimoni berhasil disetujui');
    }

    public function reject(Testimonial $testimonial)
    {
        if ($testimonial->status !== 'pending') {
            return back()->withErrors(['error' => 'Hanya testimoni pending yang bisa ditolak']);
        }

        $testimonial->update(['status' => 'rejected']);

        return back()->with('success', 'Testimoni berhasil ditolak');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimoni berhasil dihapus');
    }
}
