<?php

namespace App\Http\Controllers\Admin;

use App\Models\Car;
use App\Models\CarPhoto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Car::with(['primaryPhoto', 'bookings']);

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        // Filter by category
        if ($request->has('category') && $request->category !== '') {
            $query->where('category', $request->category);
        }

        // Search
        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('brand', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%")
                  ->orWhere('plate_number', 'like', "%{$search}%");
            });
        }

        $cars = $query->paginate(12)->through(fn($car) => [
            'id' => $car->id,
            'brand' => $car->brand,
            'model' => $car->model,
            'category' => $car->category,
            'plate_number' => $car->plate_number,
            'capacity' => $car->capacity,
            'transmission' => $car->transmission,
            'price_per_day' => $car->price_per_day,
            'status' => $car->status,
            'primary_photo' => $car->primaryPhoto ? asset('storage/' . $car->primaryPhoto->path) : null,
            'bookings_count' => $car->bookings->count(),
        ]);

        return inertia('Admin/Cars/Index', [
            'cars' => $cars,
            'filters' => $request->only(['status', 'category', 'search']),
        ]);
    }

    public function create(): Response
    {
        return inertia('Admin/Cars/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:100',
            'model' => 'required|string|max:100',
            'category' => 'required|in:sedan,suv,mpv,hatchback,luxury',
            'plate_number' => 'required|string|max:20|unique:cars',
            'capacity' => 'required|integer|min:2|max:20',
            'transmission' => 'required|in:manual,automatic',
            'price_per_day' => 'required|numeric|min:0',
            'status' => 'required|in:available,rented,maintenance',
            'description' => 'nullable|string|max:1000',
            'photos' => 'nullable|array|max:5',
            'photos.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $car = Car::create($validated);

        // Handle photo uploads
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $index => $photo) {
                $path = $photo->store('cars', 'public');
                CarPhoto::create([
                    'car_id' => $car->id,
                    'path' => $path,
                    'is_primary' => $index === 0, // first photo is primary
                ]);
            }
        }

        return redirect()->route('admin.cars.index')
            ->with('success', 'Mobil berhasil ditambahkan');
    }

    public function show(Car $car): Response
    {
        $car->load(['photos', 'bookings' => function($q) {
            $q->latest()->take(5);
        }, 'expenses' => function($q) {
            $q->latest()->take(5);
        }]);

        return inertia('Admin/Cars/Show', [
            'car' => [
                'id' => $car->id,
                'brand' => $car->brand,
                'model' => $car->model,
                'category' => $car->category,
                'plate_number' => $car->plate_number,
                'capacity' => $car->capacity,
                'transmission' => $car->transmission,
                'price_per_day' => $car->price_per_day,
                'status' => $car->status,
                'description' => $car->description,
                'photos' => $car->photos->map(fn($p) => [
                    'id' => $p->id,
                    'url' => asset('storage/' . $p->path),
                    'is_primary' => $p->is_primary,
                ]),
                'recent_bookings' => $car->bookings->map(fn($b) => [
                    'id' => $b->id,
                    'booking_code' => $b->booking_code,
                    'customer_name' => $b->customer_name,
                    'start_date' => $b->start_date->format('Y-m-d'),
                    'end_date' => $b->end_date->format('Y-m-d'),
                    'status' => $b->status,
                ]),
                'recent_expenses' => $car->expenses->map(fn($e) => [
                    'id' => $e->id,
                    'title' => $e->title,
                    'amount' => $e->amount,
                    'date' => $e->date->format('Y-m-d'),
                    'category' => $e->category,
                ]),
            ],
        ]);
    }

    public function edit(Car $car): Response
    {
        $car->load('photos');

        return inertia('Admin/Cars/Edit', [
            'car' => [
                'id' => $car->id,
                'brand' => $car->brand,
                'model' => $car->model,
                'category' => $car->category,
                'plate_number' => $car->plate_number,
                'capacity' => $car->capacity,
                'transmission' => $car->transmission,
                'price_per_day' => $car->price_per_day,
                'status' => $car->status,
                'description' => $car->description,
                'photos' => $car->photos->map(fn($p) => [
                    'id' => $p->id,
                    'url' => asset('storage/' . $p->path),
                    'is_primary' => $p->is_primary,
                ]),
            ],
        ]);
    }

    public function update(Request $request, Car $car)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:100',
            'model' => 'required|string|max:100',
            'category' => 'required|in:sedan,suv,mpv,hatchback,luxury',
            'plate_number' => 'required|string|max:20|unique:cars,plate_number,' . $car->id,
            'capacity' => 'required|integer|min:2|max:20',
            'transmission' => 'required|in:manual,automatic',
            'price_per_day' => 'required|numeric|min:0',
            'status' => 'required|in:available,rented,maintenance',
            'description' => 'nullable|string|max:1000',
            'photos' => 'nullable|array|max:5',
            'photos.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $car->update($validated);

        // Handle new photo uploads
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('cars', 'public');
                CarPhoto::create([
                    'car_id' => $car->id,
                    'path' => $path,
                    'is_primary' => false,
                ]);
            }
        }

        return redirect()->route('admin.cars.index')
            ->with('success', 'Mobil berhasil diupdate');
    }

    public function destroy(Car $car)
    {
        // Delete photos from storage
        foreach ($car->photos as $photo) {
            Storage::disk('public')->delete($photo->path);
            $photo->delete();
        }

        $car->delete();

        return redirect()->route('admin.cars.index')
            ->with('success', 'Mobil berhasil dihapus');
    }

    // Photo management endpoints
    public function deletePhoto(CarPhoto $photo)
    {
        Storage::disk('public')->delete($photo->path);
        $photo->delete();

        return back()->with('success', 'Foto berhasil dihapus');
    }

    public function setPrimaryPhoto(CarPhoto $photo)
    {
        // Reset all photos for this car
        CarPhoto::where('car_id', $photo->car_id)->update(['is_primary' => false]);

        // Set this photo as primary
        $photo->update(['is_primary' => true]);

        return back()->with('success', 'Foto utama berhasil diubah');
    }
}
