<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Midtrans\Config as MidtransConfig;
use Midtrans\Snap;
use Symfony\Component\HttpFoundation\Response;

class SubscriptionController extends Controller
{
    public function __construct()
    {
        // Initialize Midtrans configuration
        MidtransConfig::$serverKey = config('midtrans.server_key');
        MidtransConfig::$isProduction = config('midtrans.is_production', false);
        MidtransConfig::$isSanitized = true;
        MidtransConfig::$is3ds = true;
    }

    /**
     * Create a new subscription and payment transaction
     */
    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'tenant_id' => ['required', 'string', 'exists:tenants,id'],
            'plan' => ['required', 'string', 'in:Starter,Professional,Enterprise'],
            'payment_method' => ['required', 'string', 'in:credit_card,bank_transfer,bca,mandiri,bni,bri'],
            'amount' => ['required', 'numeric', 'min:1'],
        ]);

        $tenant = Tenant::findOrFail($validated['tenant_id']);

        // Create subscription record
        $subscription = Subscription::create([
            'tenant_id' => $tenant->id,
            'plan' => $validated['plan'],
            'amount' => $validated['amount'],
            'status' => 'pending',
            'payment_method' => $validated['payment_method'],
            'payment_reference' => 'RENTIVO-' . strtoupper(uniqid()),
        ]);

        try {
            // Prepare transaction details for Midtrans
            $transactionDetails = [
                'order_id' => $subscription->payment_reference,
                'gross_amount' => $validated['amount'],
            ];

            $customerDetails = [
                'first_name' => $tenant->data['company_name'] ?? 'Customer',
                'email' => $tenant->data['email'] ?? 'customer@rentivo.my.id',
            ];

            $itemDetails = [
                [
                    'id' => $validated['plan'],
                    'price' => $validated['amount'],
                    'quantity' => 1,
                    'name' => 'Rentivo ' . $validated['plan'] . ' Plan Subscription',
                ],
            ];

            $transaction = [
                'transaction_details' => $transactionDetails,
                'customer_details' => $customerDetails,
                'item_details' => $itemDetails,
                'enabled_payments' => [$validated['payment_method']],
                'callbacks' => [
                    'finish' => route('subscribe.success', ['subscription' => $subscription->id]),
                    'error' => route('subscribe.cancel', ['subscription' => $subscription->id]),
                    'pending' => route('subscribe.success', ['subscription' => $subscription->id]),
                ],
            ];

            // Get Snap token
            $snapToken = Snap::getSnapToken($transaction);

            return response()->json([
                'success' => true,
                'snap_token' => $snapToken,
                'subscription_id' => $subscription->id,
                'redirect_url' => $this->getMidtransRedirectUrl($snapToken),
            ]);

        } catch (\Exception $e) {
            Log::error('Midtrans payment error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal memproses pembayaran: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Handle successful subscription payment
     */
    public function success(Request $request): Response
    {
        $subscriptionId = $request->query('subscription');
        
        if ($subscriptionId) {
            $subscription = Subscription::find($subscriptionId);
            if ($subscription) {
                $subscription->update([
                    'status' => 'active',
                    'paid_at' => now(),
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Pembayaran berhasil! Subscription Anda sudah aktif.',
        ]);
    }

    /**
     * Handle cancelled subscription payment
     */
    public function cancel(Request $request): Response
    {
        $subscriptionId = $request->query('subscription');
        
        if ($subscriptionId) {
            $subscription = Subscription::find($subscriptionId);
            if ($subscription) {
                $subscription->update([
                    'status' => 'cancelled',
                ]);
            }
        }

        return response()->json([
            'success' => false,
            'message' => 'Pembayaran dibatalkan.',
        ]);
    }

    /**
     * Get Midtrans redirect URL from snap token
     */
    private function getMidtransRedirectUrl(string $snapToken): string
    {
        if (config('midtrans.is_production')) {
            return 'https://app.midtrans.com/snap/v2/vtweb/' . $snapToken;
        }

        return 'https://app.sandbox.midtrans.com/snap/v2/vtweb/' . $snapToken;
    }
}
