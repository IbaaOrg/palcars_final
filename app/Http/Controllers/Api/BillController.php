<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use Stripe\Charge;
use Stripe\Stripe;
use App\Models\Car;
use App\Models\Bill;
use App\Models\User;
use App\Models\Price;
use App\Models\Discount;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Notifications\createComment;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ColorResource;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\SimpleBillResource;
use App\Http\Resources\BillsCompanyResource;
use App\Http\Resources\BillsOfRenterResource;
use App\Http\Resources\RentersCompanyResource;
use App\Http\Resources\BillsOfMyCompanyResource;

class BillController extends Controller
{
    use ResponseTrait;
    public function index(){
        return $this->success(new SimpleBillResource(Bill::all()));
    }
    
    public function store(Request $request)
    {
        $currentTime=now()->format('H:i');
        $car = Car::find($request->car_id);
        $user = User::find($request->user()->id);
        $company=$car->ownerUser;
        $pickuplocations_ids=$company->locations()->whereIn('type',['pickup','pickup_dropoff'])->get();
        $dropofflocations_ids=$company->locations()->whereIn('type',['dropoff','pickup_dropoff'])->get();
        $pickupLocationIds = $pickuplocations_ids->pluck('id')->toArray();
        $dropoffLocationIds = $dropofflocations_ids->pluck('id')->toArray();

        // Validate the request data
        $validate = Validator::make($request->all(), [
            'name'=>'required',
            'phone' => 'required|numeric|regex:/^05[0-9]{8}$/',
            'address'=>'required',
            'city_id'=>'required|exists:cities,id',
            'user_id' => 'exists:users,id',
            'car_id' => 'required|exists:cars,id',
            'pickup_location_id'=>['required',  Rule::in($pickupLocationIds), ],
            'dropoff_location_id'=>['required', Rule::in($dropoffLocationIds),],
            'start_date' => 'required|date_format:Y-m-d|after_or_equal:'. now()->format('Y-m-d'),
            'start_time' => 'required|date_format:H:i'.($request->input('start_date')===now()->format('Y-m-d')?'|after_or_equal:'.$currentTime:''),
            'end_date' => 'required|date_format:Y-m-d|after_or_equal:start_date',
            'end_time' => [
                'required',
                'date_format:H:i',
                function ($attribute, $value, $fail) use ($request) {
                    // Parse start and end times using Carbon
                    $startTime = Carbon::parse($request->start_date . ' ' . $request->start_time);
                    $endTime = Carbon::parse($request->end_date . ' ' . $value);
                    
                    // Check if end time is before start time or on the same time
                    if ($endTime->lte($startTime)) {
                        $fail('The end time must be after the start time.');
                    }
                },
            ],            'method_id' => 'required|exists:methods,id',
            'discount_id' => 'nullable|exists:discounts,id',
         
        ],[
            'phone.regex'=>'The phone number must contain 10 digits start with (05)',

        ]);
    
        if ($validate->fails()) {
            $msg = $validate->errors()->first();
            return $this->fail($msg, 404);
        }
    
        // Retrieve the Car details
    
        // Ensure car exists
        if (!$car) {
            return $this->fail('Car not found', 404);
        }
    
        // Parse start and end times using Carbon
        $startTime = Carbon::parse($request->start_date . ' ' . $request->start_time);
        $endTime = Carbon::parse($request->end_date . ' ' . $request->end_time);
        $rentalDuration = $startTime->diffInHours($endTime);
        // Calculate duration and amount
            // Calculate the number of hours
            // $durationInHours = $endTime->diffInHours($startTime);
    
            // Multiply the number of hours by the price per hour
            $amount = $rentalDuration *$car->prices[count($car->prices) - 1]['price_per_hour'];
            $finalDiscount = null; // Initialize finalDiscount variable

            // Check if there are any discounts associated with the car
            if ($car->discounts()->exists()) {
                // Retrieve the last discount associated with the car
                $finalDiscount = $car->discounts()->latest()->first();
            }
            
            // Check if a final discount was found
            if ($finalDiscount) {
                $finalDiscountId = $finalDiscount->id;
            } else {
                // Handle the case where there are no discounts associated with the car
                $finalDiscountId = null; // Or any other appropriate action
            }
            $finalAmount = $amount; 
            if($car->ownerUser->role === 'Company' && $car->ownerUser->active_points===1){
            if($user->points==5 || $user->points==10||$user->points==15){
               $finalAmount=ceil($amount)-ceil(ceil($amount)*0.05);
            }else if($user->points==20 || $user->points==25||$user->points==30){
                $finalAmount=ceil($amount)-ceil(ceil($amount)*0.1);

            }else if($user->points==35 || $user->points==40||$user->points==45){
                $finalAmount=ceil($amount)-ceil(ceil($amount)*0.15);

            }else if ($user->points==50|| $user->points >50 ){
                $finalAmount=ceil($amount)-ceil(ceil($amount)*0.2);

               }
            }
                // Create a new bill record
        $bill = Bill::create([
            'name'=>$request->name,
            'phone'=>$request->phone,
            'address'=>$request->address,
            'city_id'=>$request->city_id,
            'user_id' => $request->user()->id,
            'amount' => $amount,
            'final_amount'=>$finalAmount,
            'car_id' => $request->car_id,
            'method_id' => $request->method_id,
            'discount_id' => $finalDiscountId,
            'pickup_location_id'=>$request->pickup_location_id,
            'dropoff_location_id'=>$request->dropoff_location_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
        ]);
        $prices = Price::where('car_id', $request->car_id)->get();
        $car= Car::find($request->car_id);

        if ($car->ownerUser->role === 'Company' && $car->ownerUser->active_points === 1) {
            $user->points += 5;
            $user->save();
        } 
        
        $user_comment=$request->user()->name;
        $user_photo=$request->user()->photo_user;
        $words = explode(" ", $car->make);
        // Extract the first word
        $firstWord = $words[0];
        $content="Booking a new car from your company : ".$firstWord."...";
        $car->ownerUser->notify(new createComment($car->id, $user_comment,$user_photo,$content));
        // Return success response
        return $this->success(new SimpleBillResource($bill));
    }
    
    public function show(string $id)
    {
        $data = Bill::find($id); // استرجاع سجل محدد بالمعرف
        if(!$data){
            return $this->fail('method not found',404);
        }
        return $this->success(new SimpleBillResource($data));
    }

    public function allBillsOfMyCompany(){
        $user = auth()->user();
        $myCars = $user->cars;
    
        $allBills = $myCars->flatMap(function($car) {
            return $car->bills()->orderBy("end_date", "ASC")->get();
        });
    
        return $this->success(SimpleBillResource::collection($allBills));
    }
    public function allRentersOfMyCompany()
    {
        $user = auth()->user();
        $myCars = $user->cars()->pluck('id');
        
        // Get all unique user IDs from bills of my cars
        $uniqueUserIds = \App\Models\Bill::whereIn('car_id', $myCars)
                                         ->distinct()
                                         ->pluck('user_id');
        
        // Retrieve unique users with their rental counts, points, and limited bills
        $usersWithRentalCounts = \App\Models\User::whereIn('id', $uniqueUserIds)
                                                 ->withCount(['bills as rental_count' => function ($query) use ($myCars) {
                                                     $query->whereIn('car_id', $myCars);
                                                 }])
                                                 ->with('bills')
                                                 ->get();
    
        return $this->success(RentersCompanyResource::collection($usersWithRentalCounts));
    }
    
    public function allBillsOfChosenRenter(string $id)
   {
    $user=auth()->user();
    $myCars=$user->cars()->pluck('id');
    $bills = \App\Models\Bill::where('user_id', $id)
    ->whereIn('car_id', $myCars)
    ->with(['car', 'pickup_location', 'dropoff_location'])
    ->get();
    return $this->success(BillsCompanyResource::collection($bills));
   }
    
    public function allMyExpenses(){
        $user=auth()->user();
        $myCars=$user->cars;
        foreach($myCars as $car){
            $bills=$car->bills()->orderBy("end_date","ASC")->get();
        }
        return $this->success($bills);
    }
    
    public function allBillsOfRenter() {
        $userId = auth()->id(); // Get the ID of the currently authenticated user

        // Retrieve all bills created by the user
        $bills = Bill::where('user_id', $userId)->orderBy("end_date","ASC")->get();
        if($bills->isEmpty())
        return $this->fail('no bill found for this user',404);

        return $this->success(SimpleBillResource::collection($bills));
    }
    public function showAllBillsOnCar(string $id){
       $car= Car::find($id);
       if(!$car){
        return $this->fail("car not find",404);
       }
       if ($car->status !== "rented") {
        return $this->fail("Car is not rented", 404);
        }
       $bills = Bill::where('car_id',$id)->get();
       return $this->success($bills);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $newBill = $request->bill;
        $bill = Bill::find($id);
        if(!$bill){
            return $this->fail('bill not found',404);
        }
        $data= $request->only([
            'user_id','amount','car_id','method_id','discount_id'
        ]);
        $bill->update($data);
       // $bill->update(['bill' => $newBill]);
        return $this->success(new SimpleBillResource($bill));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       $bill = Bill::find($id);
        if (!$bill) {
            return $this->fail("The bill does not exist", 404);
                    }
        $car=$bill->car;
        $user=$bill->user;
        if($bill->start_date > now() && $car->status !== 'rented'){
            if ($bill->delete()) {
            $user->points -=5;
            $user->save();
            $user_comment=$request->user()->name;
            $user_photo=$request->user()->photo_user;
            // Construct the message content
            $content = "Cancel your booking that from " . $bill->start_date . " to " . $bill->end_date ." of car ".$car->make." ".$car->model;
            // Notify the owner of the car
            $car->ownerUser->notify(new createComment($car->id, $user_comment, $user_photo, $content));
            return $this->success("Deleted successfully",200);
        }  else {
            return $this->fail("A problem occurred while deleting", 500);
        }
         }else {
                return $this->fail("Booking cannot be deleted because has already rented car", 400);
            }
            
    }

    


}
?>