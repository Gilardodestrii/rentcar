<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\Transaction;
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
            'plans' => [
                [
                    'id' => 'starter',
                    'name' => 'Starter',
                    'price' => 299000,
                    'price_formatted' => 'Rp 299.000',
                    'period' => '/bulan',
                    'features' => [
                        '1 Domain Tenant',
                        '10 Kendaraan',
                        '100 Pemesanan/Bulan',
                        'Dashboard Basic',
                        'Email Support',
                    ],
                ],
                [
                    'id' => 'professional',
                    'name' => 'Professional',
                    'price' => 799000,
                    'price_formatted' => 'Rp 799.000',
                    'period' => '/bulan',
                    'features' => [
                        '5 Domain Tenant',
                        '50 Kendaraan',
                        '1000 Pemesanan/Bulan',
                        'Dashboard Advanced',
                        'Email & Chat Support',
                        'Custom Domain',
                    ],
                    'popular' => true,
                ],
                [
                    'id' => 'enterprise',
                    'name' => 'Enterprise',
                    'price' => 1999000,
                    'price_formatted' => 'Rp 1.999.000',
                    'period' => '/bulan',
                    'features' => [
                        'Unlimited Domain Tenant',
                        'Unlimited Kendaraan',
                        'Unlimited Pemesanan',
                        'Dashboard Full Feature',
                        'Email, Chat & Phone Support',
                        'Custom Domain',
                        'API Access',
                        'Priority Support',
                    ],
                ],
            ],
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
            'phone' => ['nullable', 'string', 'max:20'],
            'plan' => ['required', 'string', 'in:starter,professional,enterprise'],
            'payment_method' => ['nullable', 'string', 'in:transfer,bca,mandiri,bni,bri,qris'],
        ]);

        $domain = "{$validated['slug']}.{$baseDomain}";

        // Buat tenant baru
        $tenant = Tenant::create([
            'id' => $validated['slug'],
            'data' => [
                'company_name' => $validated['company_name'],
                'phone' => $validated['phone'],
                'email' => $validated['email'],
                'plan' => $validated['plan'],
                'subscription_status' => 'trial',
                'trial_expires_at' => now()->addDays(7)->toDateTimeString(),
            ],
        ]);

        $tenant->domains()->create(['domain' => $domain]);

        // Buat user untuk tenant
        tenancy()->initialize($tenant);
        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);
        tenancy()->end();

        // Jika pilih bayar sekarang, buat transaksi Pakasir
        if ($request->filled('payment_method') && $request->payment_method !== 'trial') {
            $amount = $this->getPlanPrice($validated['plan']);

            // Panggil Pakasir API langsung (bukan redirect)
            $pakasirController = new \App\Http\Controllers\PakasirController();
            $response = $pakasirController->createTransaction(new Request([
                'tenant_id' => $tenant->id,
                'plan' => $validated['plan'],
                'amount' => $amount,
                'customer_name' => $validated['company_name'],
                'customer_email' => $validated['email'],
                'customer_phone' => $validated['phone'] ?? '',
            ]));

            $data = $response->getData();

            if ($data->success ?? false) {
                // Redirect ke URL pembayaran Pakasir
                return Inertia::location($data->payment_url);
            }

            // Jika gagal, hapus tenant dan return error
            $tenant->delete();
            return back()->withErrors(['payment' => $data->message ?? 'Gagal membuat transaksi']);
        }

        // Jika trial, langsung redirect ke login tenant
        return Inertia::location("https://{$domain}/login");
    }

    /**
     * Get plan price based on plan type
     */
    private function getPlanPrice(string $plan): float
    {
        return match ($plan) {
            'starter' => 299000,
            'professional' => 799000,
            'enterprise' => 1999000,
            default => 0,
        };
    }
}
