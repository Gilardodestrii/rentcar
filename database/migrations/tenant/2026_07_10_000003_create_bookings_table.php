<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_code')->unique();
            $table->foreignId('car_id')->constrained();
            $table->foreignId('driver_id')->nullable()->constrained();
            $table->enum('rental_type', ['self_drive', 'with_driver'])->default('self_drive');
            $table->string('customer_name');
            $table->string('customer_phone');
            $table->string('customer_email')->nullable();
            $table->string('ktp_photo')->nullable(); // path upload foto KTP
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->decimal('subtotal', 15, 2);
            $table->decimal('driver_fee', 15, 2)->default(0);
            $table->decimal('total_price', 15, 2);
            $table->enum('status', ['pending', 'approved', 'active', 'completed', 'cancelled'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['car_id', 'start_date', 'end_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
