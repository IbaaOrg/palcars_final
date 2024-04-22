<?php

namespace App\Models;

use App\Models\Car;
use App\Models\User;
use App\Models\Method;
use App\Models\Discount;
use App\Models\Location;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Bill extends Model
{
    use HasFactory;
    protected $fillable = ['name','phone','address','city_id','amount','user_id','car_id','method_id','discount_id','start_date','end_date','start_time','end_time','pickup_location_id','dropoff_location_id'];

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
    public function method(){
      return $this->belongsTo(Method::class);
    }
    public function pickup_location(){
      return $this->belongsTo(Location::class);
    }

    public function dropoff_location(){
      return $this->belongsTo(Location::class);
    }
}

