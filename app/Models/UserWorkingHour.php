<?php

namespace App\Models;

use App\Models\Car;
use App\Models\City;
use App\Models\User;
use App\Models\Method;
use App\Models\Discount;
use App\Models\Location;
use App\Models\UserWorkingHour;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserWorkingHour extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','day','start_hour','end_hour'];
   
    public function user(){
      return $this->belongsTo(User::class, 'user_id');
    }
   
}

