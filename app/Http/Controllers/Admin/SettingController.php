<?php

namespace App\Http\Controllers\Admin;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;

class SettingController extends Controller
{
    // Canonical map: frontend field name -> SiteSetting key
    private const MAP = [
        'site_name'       => 'site.name',
        'site_tagline'    => 'site.tagline',
        'site_logo'       => 'site.logo',
        'hero_title'      => 'hero.title',
        'hero_subtitle'   => 'hero.subtitle',
        'hero_image'      => 'hero.image',
        'about_title'     => 'about.title',
        'about_content'   => 'about.content',
        'company_phone'   => 'company.phone',
        'company_email'   => 'company.email',
        'company_address' => 'company.address',
        'company_whatsapp'=> 'company.whatsapp',
        'social_facebook' => 'social.facebook',
        'social_instagram'=> 'social.instagram',
        'social_twitter'  => 'social.twitter',
    ];

    public function index(): Response
    {
        $settings = [];
        foreach (self::MAP as $field => $key) {
            $settings[$field] = SiteSetting::get($key);
        }

        // Prefix storage path for images
        foreach (['site_logo', 'hero_image'] as $img) {
            if ($settings[$img]) {
                $settings[$img . '_url'] = asset('storage/' . $settings[$img]);
            }
        }

        return inertia('Admin/Settings/Index', ['settings' => $settings]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'site_name'        => 'nullable|string|max:100',
            'site_tagline'     => 'nullable|string|max:200',
            'site_logo'        => 'nullable|image|mimes:png,jpg,svg,webp|max:1024',
            'hero_title'       => 'nullable|string|max:100',
            'hero_subtitle'    => 'nullable|string|max:200',
            'hero_image'       => 'nullable|image|mimes:jpg,png,webp|max:3072',
            'about_title'      => 'nullable|string|max:100',
            'about_content'    => 'nullable|string|max:2000',
            'company_phone'    => 'nullable|string|max:20',
            'company_email'    => 'nullable|email|max:100',
            'company_address'  => 'nullable|string|max:500',
            'company_whatsapp' => 'nullable|string|max:20',
            'social_facebook'  => 'nullable|max:200',
            'social_instagram' => 'nullable|max:200',
            'social_twitter'   => 'nullable|max:200',
        ]);

        foreach (self::MAP as $field => $key) {
            if ($request->hasFile($field)) {
                // Delete old file if exists
                $old = SiteSetting::get($key);
                if ($old) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($old);
                }
                $path = $request->file($field)->store('settings', 'public');
                SiteSetting::set($key, $path);
            } elseif ($request->exists($field) && $request->input($field) !== null) {
                SiteSetting::set($key, $request->input($field));
            }
        }

        return back()->with('success', 'Pengaturan berhasil disimpan');
    }
}
