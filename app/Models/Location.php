<?php

namespace App\Models;

use App\Models\Car;
use App\Models\Bill;
use App\Models\City;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Location extends Model
{
    use HasFactory;
    protected $fillable=['location','city_id','type','user_id'];
   
    public function User(){
        return $this->belongsTo(User::class);
    }
    public function City(){
        return $this->belongsTo(City::class);
    }
    public function cars()
    {
        return $this->belongsToMany(Car::class);
    }
    public function bills(){
        return $this->belongsToMany(Bill::class);

    }
}
