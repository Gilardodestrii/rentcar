<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PakasirController extends Controller
{
    protected $apiKey;
    protected $baseUrl;
    protected $merchantCode;

    public function __construct()
    {
        $this->apiKey = config('pakasir.api_key');
        $this->baseUrl = config('pakasir.base_url');
        $this->merchantCode = config('pakasir.merchant_code');
    }

    /**
     * Buat transaksi baru di Pakasir
     */
    public function createTransaction(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'plan' => 'required|in:starter,professional,enterprise',
            'amount' => 'required|numeric|min:1000',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
            'customer_phone' => 'nullable|string',
        ]);

        $orderId = 'RENTIVO-' . Str::upper(Str::random(10));
        $callbackUrl = config('pakasir.callback_url');

        $payload = [
            'merchant_code' => $this->merchantCode,
            'order_id' => $orderId,
            'amount' => $validated['amount'],
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'] ?? '',
            'items' => [
                [
                    'name' => 'Rentivo Subscription - ' . ucfirst($validated['plan']),
                    'price' => $validated['amount'],
                    'quantity' => 1,
                ],
            ],
            'callback_url' => $callbackUrl,
            'return_url' => route('pakasir.return'),
            'expired_time' => now()->addHours(24)->format('Y-m-d H:i:s'),
        ];

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($this->baseUrl . '/api/v1/transactions', $payload);

            $data = $response->json();

            if ($response->successful() && isset($data['data']['payment_url'])) {
                // Simpan transaksi ke database
                $transaction = \App\Models\Transaction::create([
                    'tenant_id' => $validated['tenant_id'],
                    'order_id' => $orderId,
                    'plan' => $validated['plan'],
                    'amount' => $validated['amount'],
                    'payment_url' => $data['data']['payment_url'],
                    'status' => 'pending',
                    'payment_method' => $data['data']['payment_method'] ?? null,
                    'expired_at' => $data['data']['expired_at'] ?? now()->addHours(24),
                ]);

                return response()->json([
                    'success' => true,
                    'payment_url' => $data['data']['payment_url'],
                    'order_id' => $orderId,
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => $data['message'] ?? 'Gagal membuat transaksi',
            ], 400);

        } catch (\Exception $e) {
            Log::error('Pakasir transaction error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Handle callback dari Pakasir
     */
    public function callback(Request $request)
    {
        $payload = $request->all();
        $signature = $request->header('X-Pakasir-Signature');

        // Verifikasi signature (opsional, tergantung Pakasir)
        // $expectedSignature = hash_hmac('sha256', json_encode($payload), $this->apiKey);
        // if ($signature !== $expectedSignature) {
        //     return response()->json(['success' => false, 'message' => 'Invalid signature']);
        // }

        $orderId = $payload['order_id'] ?? null;
        $status = $payload['status'] ?? null;

        if (!$orderId) {
            return response()->json(['success' => false, 'message' => 'Order ID tidak ditemukan']);
        }

        $transaction = \App\Models\Transaction::where('order_id', $orderId)->first();

        if (!$transaction) {
            return response()->json(['success' => false, 'message' => 'Transaksi tidak ditemukan']);
        }

        // Update status transaksi
        $transaction->update([
            'status' => $status,
            'payment_data' => $payload,
        ]);

        // Jika pembayaran berhasil, aktivasi subscription
        if ($status === 'paid') {
            $this->activateSubscription($transaction);
        }

        return response()->json(['success' => true]);
    }

    /**
     * Handle return URL dari Pakasir
     */
    public function return(Request $request)
    {
        $orderId = $request->query('order_id');
        $status = $request->query('status');

        if (!$orderId) {
            return redirect('/')->with('error', 'Order ID tidak ditemukan');
        }

        $transaction = \App\Models\Transaction::where('order_id', $orderId)->first();

        if (!$transaction) {
            return redirect('/')->with('error', 'Transaksi tidak ditemukan');
        }

        if ($status === 'paid') {
            return redirect('/')->with('success', 'Pembayaran berhasil! Akun Anda akan diaktivasi dalam beberapa menit.');
        }

        if ($status === 'expired') {
            return redirect('/')->with('error', 'Pembayaran kadaluarsa. Silakan coba lagi.');
        }

        return redirect('/')->with('info', 'Status pembayaran: ' . ucfirst($status));
    }

    /**
     * Aktivasi subscription setelah pembayaran berhasil
     */
    protected function activateSubscription($transaction)
    {
        $tenant = $transaction->tenant;
        $plan = $transaction->plan;

        // Tentukan masa aktif berdasarkan plan
        $expiredAt = match ($plan) {
            'starter' => now()->addMonth(),
            'professional' => now()->addMonths(3),
            'enterprise' => now()->addYear(),
            default => now()->addMonth(),
        };

        // Update tenant subscription
        $tenant->update([
            'subscription_plan' => $plan,
            'subscription_status' => 'active',
            'subscription_expired_at' => $expiredAt,
        ]);

        // Kirim email notifikasi
        // Mail::to($tenant->email)->send(new SubscriptionActivated($tenant));

        Log::info("Subscription activated for tenant {$tenant->id} (Plan: {$plan})");
    }
}
