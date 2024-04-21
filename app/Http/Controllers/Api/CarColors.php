<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class CarColors extends Controller
{
    //
    use ResponseTrait;
    public function index(Request $request)
    {

        //
        $user=Auth::user();
        if ($user) {
            // User is authenticated
            $cars = Car::with('ownerUser')->get();
            return $this->Success(CarResource::collection($cars));
        } else {
            // User is not authenticated
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        //
        if($request->fuel_type==='electricity'){
            $fuel_full='nullable';
        }else{ 
            $fuel_full='required|numeric|min:0|max:1000';
        }
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
            'fuel_full'=>$fuel_full,
            'steering'=>'required|string|in:Automatic,Manual',            
        ]);
        if($validator->fails()){
            $msg = $validator->errors()->first();
            return $this->fail($msg, '400');
        }
        $data=[
            'car_number'=>$request->car_number,
        'make'=>$request->make,
        'model'=>$request->model,
        'catrgory'=>$request->catrgory,
        'year'=>$request->year,
        'seats'=>$request->seats,
        'doors'=>$request->doors,];
        $request->has('description')!==null??$data['description']=$request->description;
        $request->has('bags')!==null??$data['bags']=$request->bags;
        $request->has('fuel_full')!==null??$data['fuel_full']=$request->fuel_full; 
        $data['fuel_type']=$request->fuel_type;
        $data['steering']=$request->steering;
        $data['user_id']=$request->user()->id;
        $car=Car::create($data);
        return $this->success(new CarResource($car));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $car = Car::find($id);
        return $this->success(new CarResource($car));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //

        
        $car=Car::find($id);
        if(!$car){
            return $this->fail('car not found',404);
        }
        if($request->fuel_type==='electricity'){
            $fuel_full='nullable';
        }else{ 
            $fuel_full='required|numeric|min:0|max:1000';
        }
        $validator=Validator::make($request->all(), [
            'car_number'=> 'nullable|unique:cars,car_number|regex:/^[A-Z]{1,2}-[0-9]{4,5}-[A-Z]{1}$/u',
            'make'=>'nullable|string|max:255',
            'model'=>'nullable|string|max:255',
            'catrgory'=>'nullable|string|in:SUV,Hatchback,Sedan,Convertible,Crossover,Station Wagon,Minivan,Pickup trucks',
            'description'=>'nullable|string',
            'year'=>'nullable|integer|digits:4|min:1900|max:' . date('Y'),
            'seats'=>'nullable|integer|min:1|max:10',
            'doors'=>'nullable|string|in:2,3,4',
            'bags'=>'nullable|integer|min:1|max:8', 
            'fuel_type'=>'nullable|string|in:gas,diesel,electricity',
            'fuel_full'=>$fuel_full,
            'steering'=>'nullable|string|in:Automatic,Manual',            
        ]);
        if ($validator->fails()) {
            $msg = $validator->errors()->first();
            return $this->fail($msg, '400');
        }
       $data['car_number']= $request->has('car_number')?$request->input('car_number', $car->car_number):$car->car_number;
       $data['make']= $request->has('make')?$request->input('make', $car->make):$car->make;
       $data['model']= $request->has('model')?$request->input('model', $car->model):$car->model;
       $data['catrgory']= $request->has('catrgory')?$request->input('catrgory', $car->catrgory):$car->catrgory;
        if($car->description)
       $data['description']= $request->has('description')?$request->input('description', $car->description):$car->description;
       $data['year']= $request->has('year')?$request->input('year', $car->year):$car->year;
       $data['seats']= $request->has('seats')?$request->input('seats', $car->seats):$car->seats;
       $data['doors']= $request->has('doors')?$request->input('doors', $car->doors):$car->doors;
        if($car->bags)
        $data['bags']=$request->has('bags')?$request->input('bags',$car->bags):$car->bags;
    
        if($request->has('fuel_full'))
       $data['fuel_full']= $request->has('fuel_full')?$request->input('fuel_full',$car->fuel_full):$car->fuel_full; 
       
       $data['fuel_type']= $request->has('fuel_type')?$request->input('fuel_type', $car->fuel_type):$car->fuel_type;
       $request->fuel_type==='electricity'? $data['fuel_full']=null: $data['fuel_full']=$request->input('fuel_full',$car->fuel_full);
       $data['steering']= $request->has('steering')?$request->input('steering', $car->steering):$car->steering;
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
        $car->delete();
        return $this->success('successfully deleted');
        }
        return $this->fail('car not found',404);
    }

}
