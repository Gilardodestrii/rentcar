<?php

namespace App\Http\Controllers\Public;

use App\Models\Car;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Car::with('primaryPhoto')->available();

        // Filter by category
        if ($request->has('category') && $request->category !== '') {
            $query->where('category', $request->category);
        }

        // Filter by transmission
        if ($request->has('transmission') && $request->transmission !== '') {
            $query->where('transmission', $request->transmission);
        }

        // Filter by capacity
        if ($request->has('capacity') && $request->capacity !== '') {
            $query->where('capacity', '>=', $request->capacity);
        }

        // Filter by price range
        if ($request->has('min_price') && $request->min_price !== '') {
            $query->where('price_per_day', '>=', $request->min_price);
        }

        if ($request->has('max_price') && $request->max_price !== '') {
            $query->where('price_per_day', '<=', $request->max_price);
        }

        // Search
        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('brand', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%");
            });
        }

        // Sort
        $sortBy = $request->input('sort_by', 'latest');
        switch ($sortBy) {
            case 'price_low':
                $query->orderBy('price_per_day', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price_per_day', 'desc');
                break;
            case 'latest':
            default:
                $query->latest();
                break;
        }

        $cars = $query->paginate(12)->through(fn($car) => [
            'id' => $car->id,
            'brand' => $car->brand,
            'model' => $car->model,
            'category' => $car->category,
            'capacity' => $car->capacity,
            'transmission' => $car->transmission,
            'price_per_day' => $car->price_per_day,
            'photo' => $car->primaryPhoto ? \App\Helpers\StorageHelper::tenantAsset($car->primaryPhoto->path) : null,
        ]);

        return inertia('Public/Catalog', [
            'cars' => $cars,
            'filters' => $request->only(['category', 'transmission', 'capacity', 'min_price', 'max_price', 'search', 'sort_by']),
        ]);
    }

    public function show(Car $car): Response
    {
        $car->load(['photos', 'testimonials' => function($q) {
            $q->approved()->latest()->take(5);
        }]);

        // Calculate average rating
        $avgRating = $car->testimonials()->approved()->avg('rating');

        return inertia('Public/CarDetail', [
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
                    'url' => \App\Helpers\StorageHelper::tenantAsset($p->path),
                    'is_primary' => $p->is_primary,
                ]),
                'average_rating' => $avgRating ? round($avgRating, 1) : null,
                'testimonials_count' => $car->testimonials()->approved()->count(),
                'testimonials' => $car->testimonials->map(fn($t) => [
                    'id' => $t->id,
                    'customer_name' => $t->customer_name,
                    'rating' => $t->rating,
                    'comment' => $t->comment,
                    'created_at' => $t->created_at->format('d M Y'),
                ]),
            ],
        ]);
    }
}
