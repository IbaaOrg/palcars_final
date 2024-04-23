<?php

namespace App\Models;

use App\Models\Car;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Price extends Model
{
    use HasFactory;
    protected $fillable=['price','price_per_hour','price_after_discount','car_id'];
    public function car(){
        return $this->belongsTo(Car::class);
    }
}
