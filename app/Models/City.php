<?php

namespace App\Models;

use App\Models\Location;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class City extends Model
{
    use HasFactory;
    protected $fillable = ['city'];
   
    public function locations(){
        return $this->hasMany(Location::class);
    }
    
}
