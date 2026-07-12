<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            if (! Schema::hasColumn('bookings', 'ktp_path')) {
                $table->string('ktp_path')->nullable()->after('customer_email');
            }

            if (! Schema::hasColumn('bookings', 'pickup_location')) {
                $table->string('pickup_location')->nullable()->after('end_date');
            }

            if (! Schema::hasColumn('bookings', 'dropoff_location')) {
                $table->string('dropoff_location')->nullable()->after('pickup_location');
            }
        });

        DB::statement("ALTER TABLE bookings MODIFY rental_type ENUM('leasing', 'with_driver') NOT NULL DEFAULT 'leasing'");
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            if (Schema::hasColumn('bookings', 'ktp_path')) {
                $table->dropColumn('ktp_path');
            }

            if (Schema::hasColumn('bookings', 'pickup_location')) {
                $table->dropColumn('pickup_location');
            }

            if (Schema::hasColumn('bookings', 'dropoff_location')) {
                $table->dropColumn('dropoff_location');
            }
        });

        DB::statement("ALTER TABLE bookings MODIFY rental_type ENUM('self_drive', 'with_driver') NOT NULL DEFAULT 'self_drive'");
    }
};
