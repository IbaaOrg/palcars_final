<?php

namespace App\Models;

use App\Models\Car;
use App\Models\Discount;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Bill extends Model
{
    use HasFactory;
    protected $fillable = ['amount','user_id','car_id','method_id','discount_id','start_date','end_date','start_time','end_time','pickup_location_id','dropoff_location_id'];

    public function discount()
    {
        return $this->hasOne(Discount::class, 'id', 'discount_id')->latestOfMany();
    }
    public function applyDiscount()
    {
        $latestDiscount = $this->discount()->first();
        if ($latestDiscount) {
            $this->amount -= $latestDiscount->value;
            $this->save();
        }
    }
    
    public function user() 
    {
      return $this->belongsTo(User::class);
    }

    public function car() 
    {
      return $this->belongsTo(Car::class);
    }
}

