<?php

namespace App\Http\Controllers\Public;

use App\Models\Car;
use App\Models\Testimonial;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Featured cars (available cars, limit 6)
        $featuredCars = Car::with('primaryPhoto')
            ->available()
            ->take(6)
            ->get()
            ->map(fn($car) => [
                'id' => $car->id,
                'brand' => $car->brand,
                'model' => $car->model,
                'category' => $car->category,
                'capacity' => $car->capacity,
                'transmission' => $car->transmission,
                'price_per_day' => $car->price_per_day,
                'photo' => $car->primaryPhoto ? asset('storage/' . $car->primaryPhoto->path) : null,
            ]);

        // Approved testimonials (limit 6)
        $testimonials = Testimonial::with('car')
            ->approved()
            ->latest()
            ->take(6)
            ->get()
            ->map(fn($t) => [
                'id' => $t->id,
                'customer_name' => $t->customer_name,
                'rating' => $t->rating,
                'comment' => $t->comment,
                'car' => $t->car ? "{$t->car->brand} {$t->car->model}" : null,
            ]);

        // Site settings
        $settings = [
            'site_name' => SiteSetting::get('site.name', 'RenCar'),
            'site_tagline' => SiteSetting::get('site.tagline', 'Sistem Rental Mobil Professional'),
            'hero_title' => SiteSetting::get('hero.title', 'Rental Mobil Terpercaya'),
            'hero_subtitle' => SiteSetting::get('hero.subtitle', 'Armada lengkap, harga terjangkau'),
            'hero_image' => SiteSetting::get('hero.image') ? asset('storage/' . SiteSetting::get('hero.image')) : null,
            'about_title' => SiteSetting::get('about.title', 'Tentang Kami'),
            'about_content' => SiteSetting::get('about.content'),
            'company_phone' => SiteSetting::get('company.phone'),
            'company_email' => SiteSetting::get('company.email'),
            'company_whatsapp' => SiteSetting::get('company.whatsapp'),
            'social_facebook' => SiteSetting::get('social.facebook'),
            'social_instagram' => SiteSetting::get('social.instagram'),
            'social_twitter' => SiteSetting::get('social.twitter'),
        ];

        return inertia('Public/Home', [
            'featuredCars' => $featuredCars,
            'testimonials' => $testimonials,
            'settings' => $settings,
        ]);
    }
}
