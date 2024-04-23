<?php

namespace App\Models;

use App\Models\Car;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;


    protected $fillable = ['comment', 'rating', 'user_id', 'car_id'];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function owner_of_comment()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
