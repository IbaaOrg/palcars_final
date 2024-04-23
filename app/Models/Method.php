<?php

namespace App\Models;

use App\Models\Bill;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Method extends Model
{
    use HasFactory;
    
    protected $fillable = ['method'];
    public function bills (){
        return $this->hasMany(Bill::class);
    }
}
