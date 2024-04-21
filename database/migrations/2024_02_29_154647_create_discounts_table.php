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
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->text('note');
            $table->enum('type', ['percentage', 'fixed']); // Type of discount
            $table->decimal('value', 8, 2); // Discount value (percentage or fixed amount)
            $table->dateTime('expired_date');
            $table->foreignId('car_id')->constrained()->onUpdate('cascade')->onDelete('cascade');;
            $table->boolean('active')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
