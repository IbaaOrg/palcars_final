<?php

namespace App\Models;

use App\Models\Car;
use App\Models\City;
use App\Models\User;
use App\Models\Method;
use App\Models\Discount;
use App\Models\Location;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserWorkingHour extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','working_days','start_hour','end_hour'];
    public function user(){
      $this->belongsTo(User::class);
    }
}

