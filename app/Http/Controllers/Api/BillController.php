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

        // Create a new bill record
        $bill = Bill::create([
            'name'=>$request->name,
            'phone'=>$request->phone,
            'address'=>$request->address,
            'city_id'=>$request->city_id,
            'user_id' => $request->user()->id,
            'amount' => $amount,
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
        $car->update(['status' => 'rented']);
        $user->points += 5;
        $user->save();        
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
                                                 ->with('bills')->get();
    
        // Add points to the users
        $usersWithRentalCounts->each(function ($user) {
            $user->points = $user->rental_count * 5;
        });
    
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
 
        if ($bill->delete()) {
         return $this->success("Deleted successfully",200);
                             } 
        else {
         return $this->fail("A problem occurred while deleting", 500);
             }
    }


  /*  public function payment(Request $request)
    {
        $validator = Validator::make($request->all(),[
           // 'color'=>'unique:colors',
           // 'hex_value' => ['required', 'string', 'regex:/^#[0-9a-fA-F]{6}$/'],
        ],[
           // 'color.unique'=>'the color have been already exist'
        ]);
        if($validator->fails()){
            $msg=$validator->errors()->first();
            return $this->Fail($msg, '404');
        }
        //
        $bill=Bill::create([
            'first_name'=>$request->first_name,
            'last_name'=>$request->last_name,
            'date_of_birth'=>$request->date_of_birth,
            'bill_date'=>$request->bill_date,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'card_number'=>$request->card_number,
            'Expiration_date'=>$request->Expiration_date,
            'cvv'=>$request->cvv,
            'pick_up'=>$request->pick_up,
            'returnLocation'=>$request->returnLocation,
            'car'=>$request->car,
            'number_of_days'=>$request->number_of_days,
            'price'=>$request->price,
            'Discount'=>$request->Discount,
            'totalPrice'=>$request->totalPrice 
        ]);
       // تعديل الريسورس
       // return $this->success(new ColorResource($bill));
    }

    public function update(Request $request, string $id)
    {
        $bill=Bill::find($id);
       
        $data= $request->only([
           // 'location','type','car_id'
        ]);
        $bill->update($data);
        return $this->success(new SimpleBillResource($bill));
    }

    public function destroy(string $id)
    {
        $bil=Bill::find($id);
        if($bill){
        if( $bill->delete())
        return $this->success('successfully deleted',200);
        return $this->fail('error while deleteing',500);
    }
    return $this->fail("location doesn't exist",404);
    }

    public function stripePost(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
/*          $table->decimal('amount',10,2);
            $table->foreignId('user_id')->constrained();
            $table->foreignId('car_id')->constrained();
            $table->foreignId('method_id')->constrained();
            $table->foreignId('discount_id')->constrained(); 
        try {
            $charge = Charge::create([
                'amount' => $request->amount,
                'car_id'=> $request->car_id,
                'user_id'=>$request->user()->id,
                'method_id' => $request->method_id,
                'source' => $request->stripeToken,
                'discount_id'=> $request->discount_id,
                //'discount'=>Discount()->$finalPrice,
                'description' => 'Payment for Invoice #' . $request->invoice_number,
            ]);
                $charge->applyDiscount();

            // عملية الدفع ناجحة
            // يمكنك هنا تحديث حالة الفاتورة في قاعدة البيانات إلى "تم الدفع" وما إلى ذلك
            return redirect()->back()->with('success', 'Payment successful');
        } catch (\Exception $e) {
            // حدث خطأ أثناء عملية الدفع
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    public function stripe()
    {
        return view('stripe');
    }*/

}
?>