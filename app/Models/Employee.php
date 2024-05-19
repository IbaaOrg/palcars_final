<?php

namespace App\Models;

use App\Models\Car;
use App\Models\Bill;
use App\Models\User;
use App\Models\Comment;
use App\Models\Message;
use App\Models\CarImage;
use App\Models\Employee;
use App\Models\Favorite;
use App\Models\Location;
use App\Models\Notification;
use App\Models\UserWorkingHour;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as AuthenticatableUser;

class Employee extends AuthenticatableUser implements Authenticatable
{
    use HasFactory, Notifiable,HasApiTokens;
        /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'full_name',
        'email',
        'phone',
        'location',
        'job_title', 
        'start_date',
    ];
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
