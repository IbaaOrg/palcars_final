<?php

namespace App\Models;

use App\Models\Car;
use App\Models\Comment;
use App\Models\Message;
use App\Models\CarImage;
use App\Models\Favorite;
use App\Models\Location;
use App\Models\Notification;
use App\Models\Bill;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as AuthenticatableUser;

class User extends AuthenticatableUser implements Authenticatable
{
    use HasFactory, Notifiable,HasApiTokens;
        /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'photo_user',
        'photo_drivinglicense',
        'birthdate',
        'description',
        'role'
    ];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function isAdmin(){
        return $this->role==="Admin";
    }
    public function isRenter(){
        return $this->role==="Renter";
    }
    public function isCompany(){
        return $this->role === "Company";
    }
    public function isAdminOrCompany(){
        return $this->role === "Company"||$this->role === "Admin";
    } 
    public function isRenterOrCompany(){
        return $this->role === "Company"||$this->role === "Renter";
    }

    //cars for company
    public function cars(){
        return $this->hasMany(Car::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
  
    // //rented car 
    public function rentedCar(){
        return $this->hasOne(Car::class);
    }
    public function favorites(){
        return $this->hasMany(Favorite::class);
    }
    public function messages(){
        return $this->hasMany(Message::class);

    }
    public function locations(){
        return $this->hasMany(Location::class);
    }
    public function sentNotifications()
    {
        return $this->hasMany(Notification::class, 'user_id');
    }

    public function receivedNotifications()
    {
        return $this->hasMany(Notification::class, 'receiver_id');
    }
    public function bills()
    {
        return $this->hasMany(Bill::class);
    }
    // //all rentals
    // public function rentals()
    // {
    //     return $this->hasMany(Rental::class);
    // }
}
