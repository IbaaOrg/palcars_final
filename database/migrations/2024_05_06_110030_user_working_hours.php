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
              Schema::create('user_working_hours', function (Blueprint $table) {

        $table->id();
        $table->foreignId('user_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
        $table->enum('day', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
        $table->time('start_hour');
        $table->time('end_hour');
        $table->timestamps();
              });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_working_hours');
    }
};
