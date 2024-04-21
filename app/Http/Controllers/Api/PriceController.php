<?php

namespace App\Http\Controllers\Api;

use App\Models\Car;
use App\Models\Price;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Http\Resources\PriceResource;
use Illuminate\Support\Facades\Validator;

class PriceController extends Controller
{
    use ResponseTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
     $price=Price::all();
     return $this->success($price);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validator=Validator::make($request->all(),[
        'car_id'=>'required|exists:cars,id',
        'price'=>'required|numeric|min:50',
        ],[
            'car_id.exists'=>"The selected car isn't exist ",
            'price.required' => 'The price field is required.',
        'price.numeric' => 'The price must be a number.',
        'price.min' => 'The price must be at least :min.',
        ]
        );
        if($validator->fails()){
            $msg = $validator->errors()->first();
            return $this->fail($msg, '400');
        }
        $priceAfterDiscount = $request->price; // Initialize with the original price
        if ($request->price === 0 || $request->price === null) {
            // Handle the error or return an appropriate response
            return $this->fail("Price must be a non-zero value", '400');
        }
        
        
        // Calculate price per hour, ensuring that $request->price is not zero
        $pricePerHour = ($priceAfterDiscount / 24 );

        $data=[
            'car_id'=>$request->car_id,
            'price'=>$request->price,
            'price_per_hour'=>$pricePerHour,
            'price_after_discount'=>$priceAfterDiscount,
        ];

        $price=Price::create($data);
        return $this->success(new PriceResource($price));
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
    public function deleteAllPricesOfCar(string $id){
        $car=Car::find($id);
        if($car){
            $car->prices()->delete();
            return $this->success('deleted all prices of car successfully');
        }
        return $this->fail('car not found',404);

    }

    public function destroy(string $id)
    {
        //
        
        
    }
}
