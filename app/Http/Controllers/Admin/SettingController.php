<?php

namespace App\Http\Controllers\Admin;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(): Response
    {
        $settings = [
            'site_name' => SiteSetting::get('site.name', 'RenCar'),
            'site_tagline' => SiteSetting::get('site.tagline', 'Sistem Rental Mobil Professional'),
            'site_logo' => SiteSetting::get('site.logo'),
            'company_phone' => SiteSetting::get('company.phone'),
            'company_email' => SiteSetting::get('company.email'),
            'company_address' => SiteSetting::get('company.address'),
            'company_whatsapp' => SiteSetting::get('company.whatsapp'),
            'social_facebook' => SiteSetting::get('social.facebook'),
            'social_instagram' => SiteSetting::get('social.instagram'),
            'social_twitter' => SiteSetting::get('social.twitter'),
            'hero_title' => SiteSetting::get('hero.title', 'Rental Mobil Terpercaya'),
            'hero_subtitle' => SiteSetting::get('hero.subtitle', 'Armada lengkap, harga terjangkau'),
            'hero_image' => SiteSetting::get('hero.image'),
            'about_title' => SiteSetting::get('about.title', 'Tentang Kami'),
            'about_content' => SiteSetting::get('about.content'),
        ];

        return inertia('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'nullable|string|max:100',
            'site_tagline' => 'nullable|string|max:200',
            'site_logo' => 'nullable|image|mimes:png,jpg,svg|max:1024',
            'company_phone' => 'nullable|string|max:20',
            'company_email' => 'nullable|email|max:100',
            'company_address' => 'nullable|string|max:500',
            'company_whatsapp' => 'nullable|string|max:20',
            'social_facebook' => 'nullable|url|max:200',
            'social_instagram' => 'nullable|url|max:200',
            'social_twitter' => 'nullable|url|max:200',
            'hero_title' => 'nullable|string|max:100',
            'hero_subtitle' => 'nullable|string|max:200',
            'hero_image' => 'nullable|image|mimes:jpg,png,webp|max:2048',
            'about_title' => 'nullable|string|max:100',
            'about_content' => 'nullable|string|max:2000',
        ]);

        foreach ($validated as $key => $value) {
            if ($value === null) continue;

            // Handle file uploads
            if ($request->hasFile($key)) {
                $path = $request->file($key)->store('settings', 'public');
                SiteSetting::set($key, $path);
            } else {
                // Convert snake_case to dot notation (site_name -> site.name)
                $settingKey = str_replace('_', '.', $key);
                SiteSetting::set($settingKey, $value);
            }
        }

        return back()->with('success', 'Pengaturan berhasil disimpan');
    }
}
