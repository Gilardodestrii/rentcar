<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('tenant_id');
            $table->string('plan');
            $table->decimal('amount', 12, 2);
            $table->string('currency', 3)->default('IDR');
            $table->string('status')->default('pending'); // pending, active, cancelled, expired
            $table->string('payment_method')->nullable();
            $table->string('payment_reference')->unique();
            $table->string('transaction_id')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade');
            $table->index('tenant_id');
            $table->index('status');
            $table->index('payment_reference');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
