<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('tenant_id'); // Ubah ke string (sama kayak tenants.id)
            $table->string('order_id')->unique();
            $table->string('plan'); // starter, professional, enterprise
            $table->decimal('amount', 12, 2);
            $table->string('payment_url')->nullable();
            $table->string('status')->default('pending'); // pending, paid, failed, expired
            $table->string('payment_method')->nullable();
            $table->json('payment_data')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();

            $table->foreign('tenant_id')
                  ->references('id')
                  ->on('tenants')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
