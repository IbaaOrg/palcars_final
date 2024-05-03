<?php

namespace App\Http\Controllers\Api;

use App\Models\Car;
use App\Models\Favorite;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Http\Resources\FavoriteResource;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\UserFavoriteResource;

class FavoriteController extends Controller
{
    use ResponseTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user=auth()->user();
        $favorites=$user->favorites()->get();
        $count=$favorites->count();
        return $this->success(UserFavoriteResource::collection($favorites));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validator=Validator::make($request->all(),[
            'car_id'=>'required|exists:cars,id',
        ]);
        if($validator->fails()){
            $msg = $validator->errors()->first();
            return $this->fail($msg, '400');
        }
        $favorite=Favorite::create([
            'user_id'=>$request->user()->id,
            'car_id'=>$request->car_id,
        ]);
        return $this->success(new FavoriteResource($favorite));

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $favoriteCar = Favorite::where('car_id', $id)->delete();
        if($favoriteCar){
            return $this->success('successfully deleted');
        }

        return $this->fail("this item isn't found",404);
        
    }
    public function destroyAll(){
        $list=Favorite::truncate();
        if($list){
            return $this->success('All items have been deleted successully');
        }
        $this->fail('an error has accoured',400);

    }
}
