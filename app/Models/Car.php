<?php

namespace App\Models;

use App\Models\Bill;
use App\Models\User;
use App\Models\Color;
use App\Models\Price;
use App\Models\Comment;
use App\Models\CarImage;
use App\Models\Discount;
use App\Models\Favorite;
use App\Models\Location;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Car extends Model
{
    use HasFactory;
    protected $fillable=['car_number','make','model','catrgory','description','year','seats','doors','bags','fuel_full','fuel_type','steering','status','user_id','color_id'];
    //company that add car
    public function ownerUser(){
        return $this->belongsTo(User::class, 'user_id');
    }
    // //user that rent a car
    // public function renter(){
    //     return $this->hasOne(User::class);
    // }
    public function discounts(){
        return $this->hasMany(Discount::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function color()
    {
        return $this->belongsTo(Color::class,'color_id');
    }
public function images(){
    return $this->hasMany(CarImage::class);
}
public function prices(){
    return $this->hasMany(Price::class);
}
public function favorites(){
    return $this->hasMany(Favorite::class);

}
public function bills() 
{
  return $this->hasMany(Bill::class);
}
}
