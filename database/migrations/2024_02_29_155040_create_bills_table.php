<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount',10,2);
            $table->foreignId('user_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('car_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('method_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('discount_id')->nullable()->default(null)->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('pickup_location_id')->constrained('locations')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('dropoff_location_id')->constrained('locations')->onUpdate('cascade')->onDelete('cascade');
             // Add start date and time columns
             $table->date('start_date');
             $table->time('start_time');
             // Add end date and time columns
             $table->date('end_date');
             $table->time('end_time');
         
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bills');
    }
};
