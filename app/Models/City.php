<?php

namespace App\Models;

use App\Models\Bill;
use App\Models\User;
use App\Models\Location;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class City extends Model
{
    use HasFactory;
    protected $fillable = ['city'];
   
    public function locations(){
        return $this->hasMany(Location::class);
    }
    public function bills(){
        return $this->hasMany(Bill::class);
    }
    
}
