<?php

namespace App\Models;

use App\Models\Car;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CarImage extends Model
{
    use HasFactory;
    protected $fillable=['photo','car_id'];
    public function car(){
        return $this->hasOne(Car::class);
    }
    public function ownerUser(){
        return $this->hasOne(User::class,'user_id');
    }
}
