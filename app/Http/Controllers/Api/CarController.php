<?php

namespace App\Http\Controllers\Api;
use App\Models\Car;
use App\Models\City;
use App\Models\User;
use App\Models\Color;
use App\Models\Price;
use App\Models\Location;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\CarResource;
use App\Http\Controllers\Controller;
use App\Notifications\createComment;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\OneCarResource;
use App\Http\Resources\PriceCarResource;
use App\Http\Resources\CarImagesResource;
use App\Http\Resources\PricesCarResource;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\DiscountCarResource;
use App\Http\Resources\CommentOfCarResource;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use ResponseTrait;
    public function index(Request $request)
    {

        // Get the parameters from the request
    $make = $request->input('make');
    $model = $request->input('model');
    $category = $request->input('category');
    $seats = $request->input('seats');
    $bags = $request->input('bags');
    $year = $request->input('year');
    $fuel_type=$request->input('fuel_type');
    $steering=$request->input('steering');
    $minPrice = $request->input('min_price'); // New parameter for minimum price
    $maxPrice = $request->input('max_price');

    // Start with a base query for cars
    $query = Car::query();

    // Apply filters based on parameters
    if ($make) {
        $query->where('make', $make);
    }
    if ($model) {
        $query->where('model', $model);
    }
    if ($category) {
        $query->where('catrgory', $category);
    }
    if ($seats) {
        $query->where('seats', $seats);
    }
    if ($bags) {
        $query->where('bags', $bags);
    }
    if ($year) {
        $query->where('year', $year);
    }
    if($fuel_type){
        $query->where('fuel_type',$fuel_type);
    }
    if($steering){
        $query->where('steering',$steering);
    }
    // Apply price range filter based on the last final price
if ($minPrice && $maxPrice) {
    $query->whereHas('prices', function ($query) use ($minPrice, $maxPrice) {
        // Subquery to get the last (final) price for each car
        $query->whereRaw('prices.id = (SELECT MAX(id) FROM prices WHERE car_id = cars.id)')
              ->whereBetween('price_after_discount', [$minPrice, $maxPrice]);
    });
}



    // Execute the query and fetch the cars
    $cars = $query->get();
        //
            if($cars)
            return $this->Success(CarResource::collection($cars));
       
    }
public function carsInSpecifiedeLocations(Request $request){
    $pickupLocationName = $request->input('pickup_location_name');
    $dropOffLocationName = $request->input('dropoff_location_name');
    $pickupLocation=Location::where('location',$pickupLocationName)->first();
    if(!$pickupLocation){
        return $this->fail("location doesn't exist",404);
    }
    $pickupUserId = $pickupLocation->user_id;

// Retrieve the user ID associated with the drop-off location
$dropOffLocation = Location::where('location',$dropOffLocationName)->first();
if(!$dropOffLocation){
    return $this->fail("location doesn't exist",404);
}
$dropOffUserId = $dropOffLocation->user_id;

   // Retrieve users associated with the pickup location
   $pickupLocationUsers = User::whereHas('locations', function ($query) use ($pickupLocationName) {
    $query->where('location', $pickupLocationName);
})
->get();

// Retrieve users associated with the drop-off location
$dropOffLocationUsers = User::whereHas('locations', function ($query) use ($dropOffLocationName) {
    $query->where('location', $dropOffLocationName);
})
->get();

// Combine the user IDs
$userIds = $pickupLocationUsers->pluck('id')->merge($dropOffLocationUsers->pluck('id'))->unique();

// Retrieve cars associated with these users
$allCars = Car::whereIn('user_id', $userIds)
    ->whereDoesntHave('bills', function ($query) use ($request) {
        $query->where(function ($query) use ($request) {
            $query->where('start_date', '<=', $request->end_date)
                ->where('end_date', '>=', $request->start_date)
                ->where(function ($query) use ($request) {
                    $query->where('start_time', '<=', $request->end_time)
                        ->where('end_time', '>=', $request->start_time);
                })
                ->where('status', 'rented');
        });
    })
    ->get();

if($allCars){
return $this->success(CarResource::collection($allCars));
}
return $this->fail("these location doesn't have any car",404);
}
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        //
     
        $validator=Validator::make($request->all(), [
            'car_number'=> 'required|unique:cars,car_number|regex:/^[A-Z]{1,2}-[0-9]{4,5}-[A-Z]{1}$/u',
            'make'=>'required|string|max:255',
            'model'=>'required|string|max:255',
            'catrgory'=>'required|string|in:SUV,Hatchback,Sedan,Convertible,Crossover,Station Wagon,Minivan,Pickup trucks',
            'description'=>'nullable|string',
            'year'=>'required|integer|digits:4|min:1900|max:' . date('Y'),
            'seats'=>'required|integer|min:1|max:10',
            'doors'=>'required|string|in:2,3,4',
            'bags'=>'nullable|integer|min:1|max:8', 
            'fuel_type'=>'required|string|in:gas,diesel,electricity',
            'steering'=>'required|string|in:Automatic,Manual',
            'color_id'=>'required|exists:colors,id'        
        ]);
        if ($request->fuel_type === 'electricity') {
            $rules['fuel_full'] = 'nullable';
        } else {
            $rules['fuel_full'] = 'required|numeric|min:0|max:1000';
        }
        if ($validator->fails()) {
            
            $errors = $validator->errors()->first();
            return $this->fail($errors, '400');
        }
        $data=[
            'car_number'=>$request->car_number,
        'make'=>$request->make,
        'model'=>$request->model,
        'catrgory'=>$request->catrgory,
        'year'=>$request->year,
        'seats'=>$request->seats,
        'doors'=>$request->doors,];
        isset($request->description) ? $data['description'] = $request->description : null;
        isset($request->bags) ? $data['bags'] = $request->bags : null;
        $data['fuel_type']=$request->fuel_type;

        
        if ($request->fuel_type === 'electricity') {
            $data['fuel_full'] = null; // Set fuel_full to null if fuel_type is electricity
        } else {
            $data['fuel_full'] = $request->fuel_full; // Assign the provided value if fuel_type is not electricity
        }
        
        $data['steering']=$request->steering;
        $data['user_id']=$request->user()->id;
        $data['color_id']=$request->color_id;
        $car=Car::create($data);
        $car= Car::find($car->id);
        $user_car=$request->user()->name;
        $user_photo=$request->user()->photo_user;
        $words = explode(" ", $car->model);
        // Extract the first word
        $firstWord = $words[0];
        $content="added a new car : ".$firstWord."...";

        $otherUsers =    User::where('role','Renter')->get();
        foreach($otherUsers as $user){
            $user->notify(new createComment($car->id, $user_car,$user_photo,$content));

        }
        return $this->success(new CarResource($car));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $car = Car::find($id);
        if($car){
           // Retrieve the records matching the condition
$notifications = DB::table('notifications')->where('data->comment_id', $id)->get();

// Update each notification record
foreach ($notifications as $notification) {
    DB::table('notifications')->where('id', $notification->id)->update(['read_at' => now()]);
}
            return $this->success(new CarResource($car));
        }

    return $this->fail('car not found',404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //

        
    //     $car=Car::find($id);
    //     if(!$car){
    //         return $this->fail('car not found',404);
    //     }
    //     if($request->fuel_type==='electricity'){
    //         $fuel_full='nullable';
    //     }else{ 
    //         $fuel_full='required|numeric|min:0|max:1000';
    //     }
    //     $validator=Validator::make($request->all(), [
    //         'car_number'=> 'nullable|unique:cars,car_number|regex:/^[A-Z]{1,2}-[0-9]{4,5}-[A-Z]{1}$/u',
    //         'make'=>'nullable|string|max:255',
    //         'model'=>'nullable|string|max:255',
    //         'catrgory'=>'nullable|string|in:SUV,Hatchback,Sedan,Convertible,Crossover,Station Wagon,Minivan,Pickup trucks',
    //         'description'=>'nullable|string',
    //         'year'=>'nullable|integer|digits:4|min:1900|max:' . date('Y'),
    //         'seats'=>'nullable|integer|min:1|max:10',
    //         'doors'=>'nullable|string|in:2,3,4',
    //         'bags'=>'nullable|integer|min:1|max:8', 
    //         'fuel_type'=>'nullable|string|in:gas,diesel,electricity',
    //         'fuel_full'=>$fuel_full,
    //         'steering'=>'nullable|string|in:Automatic,Manual',            
    //         'car_id'=>'nullable|exists:colors,id'
    //     ]);
    //  
    //     if($request->fuel_full)
    //    $data['fuel_full']= $request->has('fuel_full')?$request->input('fuel_full',$car->fuel_full):$car->fuel_full; 
       
    //    $data['fuel_type']= $request->has('fuel_type')?$request->input('fuel_type', $car->fuel_type):$car->fuel_type;
   
    $car = Car::find($id);
    if (!$car) {
        return $this->fail('Car not found', 404);
    }

    $validator = Validator::make($request->all(), [
        'car_number' => 'nullable|unique:cars,car_number|regex:/^[A-Z]{1,2}-[0-9]{4,5}-[A-Z]{1}$/u',
        'make' => 'nullable|string|max:255',
        'model' => 'nullable|string|max:255',
        'catrgory' => 'nullable|string|in:SUV,Hatchback,Sedan,Convertible,Crossover,Station Wagon,Minivan,Pickup trucks',
        'description' => 'nullable|string',
        'year' => 'nullable|integer|digits:4|min:1900|max:' . date('Y'),
        'seats' => 'nullable|integer|min:1|max:10',
        'doors' => 'nullable|string|in:2,3,4',
        'bags' => 'nullable|integer|min:1|max:8',
        'steering' => 'nullable|string|in:Automatic,Manual',
        'color_id' => 'nullable|exists:colors,id'
    ]);

    if ($validator->fails()) {
        $msg = $validator->errors()->first();
        return $this->fail($msg, 400);
    }

    $data = $request->only([
        'car_number', 'make', 'model', 'catrgory', 'description', 'year',
        'seats', 'doors', 'bags', 'steering', 'color_id'
    ]);

    // Update the car
    $car->update($data);

    return $this->success($car);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $car = Car::find($id);

        if($car){
            DB::table('car_images')->where('car_id', $car->id)->delete();
            DB::table('comments')->where('car_id', $car->id)->delete();
            DB::table('cars')->where('id', $car->id)->delete();
            DB::table('prices')->where('car_id', $car->id)->delete();
            return $this->success('successfully deleted');
        }
        return $this->fail('car not found',404);
    }
    public function carImages(Request $request,string $id){
        $car=Car::find($id);
        $car->images=$car->images;
        if(!$car){
            return $this->fail('car not found',404);
        }
        return $this->success(new CarImagesResource($car));

    }
    public function pricesOfCar(Request $request,string $id){
        $car=Car::find($id);
        $car->prices=$car->prices;
        if(!$car){
            return $this->fail('car not found',404);
        }
        return $this->success(new PricesCarResource($car));
    }
    public function reviews(Request $request,String $id){
        $car=Car::find($id);
        $car->reviews=$car->reviews;
        if (!$car) {
        return $this->fail('Car not found', 404);
    }
        return $this->success(new CommentOfCarResource($car));
    }
    public function discountsOfCar(Request $request,String $id){
        $car=Car::find($id);
        $car->discounts=$car->discounts;
        if(!$car){
            return $this->fail('car not found',404);
        }
        return $this->success(new DiscountCarResource($car));

    }

}
