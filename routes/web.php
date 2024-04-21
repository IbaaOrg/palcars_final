<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BillController;

Route::get('/{any?}', function () {
    return view('welcome');
})->where('any','.*');

