<?php

namespace App\Http\Controllers\Api;

use App\Models\Car;
use App\Models\Price;
use App\Models\Discount;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\SimpleDiscountResource;

class DiscountController extends Controller
{
    use ResponseTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'note'=>'required',
            'type'=>'required|in:percentage,fixed',
            'value' =>$request->type==='percentage'? 'required|numeric|min:0|max:100':'required|numeric|min:0',
            'expired_date' => 'required|date_format:Y-m-d H:i:s|after:+1 hour',
            'car_id'=>'required|exists:cars,id'  ,
        ],[
          'type.in'=> 'The type must be either percentage or fixed.',
          'expired_date.after_or_equal' => 'The expired date must be a date and time after one hour aat least.',
        ]);
        if ($validator->fails()) {
            $msg = $validator->errors()->first();
            return $this->fail($msg, '400');
        }
       $discount= Discount::create([
        'note'=>$request->note,
        'type'=>$request->type,
        'value'=>$request->value,
        'expired_date'=>$request->expired_date,
        'car_id'=>$request->car_id,
       ]);

       $prices = Price::where('car_id', $request->car_id)->get();
       foreach($prices as $price){
        $finalPrice=$price->price;
        //calculate final price after discount
        if($request->type==='percentage'){
            $price->price_after_discount=$price->price-($price->price*$discount->value/100);
            $finalPrice= $price->price_after_discount;
            $price_per_hour=$finalPrice / 24;
        }
        if($request->type==='fixed'){
            $price->price_after_discount=$price->price-$discount->value;
            $finalPrice= $price->price_after_discount;
            $price_per_hour=$finalPrice / 24;

        }
        $price->update(['price_after_discount' => $finalPrice]);
        $price->update(['price_per_hour' => $price_per_hour]);

       }
       return $this->success(new SimpleDiscountResource($discount));

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
        $discount=Discount::find($id);
        if(!$discount){
            return $this->fail('discount not found',404);
        }
        $rules=[
            'note'=>'nullable',
            'type'=>'nullable|in:percentage,fixed',
        ];
        if($request->type)
        {
            if($request->type==='percentage'){
                $rules['value']= 'required|numeric|min:0|max:100';
             }
             if($request->type==='fixed'){
                $rules['value']= 'required|numeric|min:0';
             } 

        }else {
            $rules['value']= 'nullable';

        }
        $rules['note']='nullable';
        $rules['type']='nullable|in:percentage,fixed';
        $messages = [
            'type.in' => 'The type must be either percentage or fixed.',
            'expired_date.after_or_equal' => 'The expired date must be a date and time on or after now.'
        ];
        
        $validator=Validator::make($request->all(),$rules,$messages);

           
        if ($validator->fails()) {
            $msg = $validator->errors()->first();
            return $this->fail($msg, '400');
        }
        $data = $request->only([
            'note', 'type', 'value', 'expired_date',
        ]);
        $discount->update($data);
        // Retrieve the prices associated with the car
    $prices = Price::where('car_id', $discount->car_id)->get();

    foreach ($prices as $price) {
        $finalPrice = $price->price;

        // Calculate final price after discount
        if ($discount->type === 'percentage') {
            $price->price_after_discount = $price->price - ($price->price * $discount->value / 100);
            $finalPrice = $price->price_after_discount;
        } elseif ($discount->type === 'fixed') {
            $price->price_after_discount = $price->price - $discount->value;
            $finalPrice = $price->price_after_discount;
        }

        $price->update(['price_after_discount' => $finalPrice]);
    }

        return $this->success(new SimpleDiscountResource($discount));
        }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $discount =Discount::find($id);

        if($discount){
            $discount->delete();
            $prices = Price::where('car_id', $discount->car_id)->get();
            foreach ($prices as $price) {
                $finalPrice = $price->price;
                $price->update(['price_after_discount' => $finalPrice]);
    
            }
            return $this->success('successfully deleted');
        }     
       
        return $this->fail('discount not found',404);
    }
   
}
