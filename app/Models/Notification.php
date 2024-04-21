<?php

namespace App\Models;

use App\Models\User;
use App\Models\Notification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    use HasFactory;

    protected $fillable=['user_id','reciver_id','notification'];
   
    public function sender()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function reciver()
    {
        return $this->belongsTo(User::class, 'reciver_id');
    }
}
