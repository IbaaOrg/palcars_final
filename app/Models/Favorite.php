<?php

namespace App\Models;

use App\Models\Car;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Favorite extends Model
{
    protected $fillable=['user_id','car_id'];
    use HasFactory;
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function car(){
        return $this->belongsTo(Car::class);

    }
}
