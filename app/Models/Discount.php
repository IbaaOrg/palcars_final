<?php

namespace App\Models;

use App\Models\Car;
use App\Models\Bill;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Discount extends Model
{
    protected $fillable=['note','type','value','expired_date','car_id','active'];
    use HasFactory;

    public function car(){
        return $this->belongsTo(Car::class);
    }
    public function bill()
    {
        return $this->hasMany(Bill::class, 'discount_id', 'id');
    }
}
