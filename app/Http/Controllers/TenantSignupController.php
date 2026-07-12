<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class TenantSignupController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Central/TenantSignup', [
            'baseDomain' => config('app.central_domain', parse_url(config('app.url'), PHP_URL_HOST)),
        ]);
    }

    public function store(Request $request): SymfonyResponse
    {
        $baseDomain = config('app.central_domain', parse_url(config('app.url'), PHP_URL_HOST));

        $validated = $request->validate([
            'company_name' => ['required', 'string', 'max:100'],
            'slug' => [
                'required',
                'string',
                'min:3',
                'max:32',
                'regex:/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/',
                Rule::unique('tenants', 'id'),
            ],
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:100'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $domain = "{$validated['slug']}.{$baseDomain}";

        $tenant = Tenant::create([
            'id' => $validated['slug'],
            'data' => ['company_name' => $validated['company_name']],
        ]);

        $tenant->domains()->create(['domain' => $domain]);

        tenancy()->initialize($tenant);
        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);
        tenancy()->end();

        return Inertia::location("https://{$domain}/login");
    }
}
