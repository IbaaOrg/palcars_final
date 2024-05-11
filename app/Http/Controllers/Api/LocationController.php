<?php

namespace App\Http\Controllers\Api;

use App\Models\City;
use App\Models\User;
use App\Models\Location;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\LocationOfCityResource;
use App\Http\Resources\SimpleLocationResource;
use App\Http\Resources\LocationOfCompanyResource;
use App\Http\Resources\SimpleLocationShowResource;


class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use ResponseTrait; 
    public function index()
    {
        return $this->success(SimpleLocationResource::collection(Location::all()));
    }
    public function allLocationsOfCompany(String $id){
        $company =User::find($id);
        if(!$company)
        return $this->fail("company isn't exist",404);
        if($company->role==='Company'){
           $company= User::with('locations')->find($id);
        return $this->success( new LocationOfCompanyResource($company));
        }else {
            return $this->fail("the chosen user isn't company",400);
        }
    }
    public function allLocationsPickupOfCompany(String $id){
        $company =User::find($id);
        if(!$company)
        return $this->fail("company isn't exist",404);
        if($company->role==='Company'){
           $company= User::with(['locations'=>function($query){
            $query->whereIn('type',['pickup','pickup_dropoff']);
           }])->find($id);
        return $this->success( new LocationOfCompanyResource($company));
        }else {
            return $this->fail("the chosen user isn't company",400);
        }
    }
    public function allLocationsDropoffOfCompany(String $id){
        $company =User::find($id);
        if(!$company)
        return $this->fail("company isn't exist",404);
        if($company->role==='Company'){
           $company= User::with(['locations'=>function($query){
            $query->whereIn('type',['dropoff','pickup_dropoff']);
           }])->find($id);
        return $this->success( new LocationOfCompanyResource($company));
        }else {
            return $this->fail("the chosen user isn't company",400);
        }
    }
    public function allLocationsOfMyCompany(){
        $user=Auth::user();
        $locations=User::with('locations')->find($user->id);
        return $this->success(new LocationOfCompanyResource($locations));
    }
    public function allLocationsInCity(string $id){
        $city=City::find($id);
        if(!$city){
            return $this->fail("city isn't exist",404);
        }
        $locations=City::with('locations')->find($city->id);
        return $this->success(new LocationOfCityResource($locations));
    }
    public function allCarsInLocation(string $id){
        // $location= Location::find($id);
        // if(!$location){
        //     return $this->fail("location isn't exist",404);
        // }
        // $company=$location->user_id;
        // $cars=User::with('cars')->find($company);
        // return $this->success($cars);
        $city=City::find($id);
    }
    public function allLocationPickup(){
        $locations = Location::whereIn('type', ['pickup', 'pickup_dropoff'])->get();
        return $this->success( SimpleLocationShowResource::collection( $locations));
    }
    public function allLocationDropoff(){
        $locations = Location::whereIn('type', ['dropoff', 'pickup_dropoff'])->get();
        return $this->success( SimpleLocationShowResource::collection($locations));
    }
    public function allLocationPickupDropoff(){
        $locations = Location::whereIn('type', ['pickup_dropoff'])->get();
        return $this->success( SimpleLocationShowResource::collection($locations));
    }
    /**
     * Store a newly created resource in storage.
     */
       public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'location'=>'required|string|max:255',
            'city_id'=>'required|exists:cities,id',
        ]);
        if($validator->fails()){
            $errors=$validator->errors()->first();
            return $this->fail($errors,'400');
        }

        $data=[
            'location'=>$request->location,
            'city_id'=>$request->city_id,
            'type'=>$request->type?$request->type:'pickup_dropoff',
            'user_id'=>$request->user()->id,
        ];
       

        $location=Location::create($data);
        return $this->success(new SimpleLocationResource($location));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Location::find($id); // استرجاع سجل محدد بالمعرف
        return $this->success($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $location=Location::find($id);
        if(!$location){
            return $this->fail("location isn't exist",404);
        }
        $validator=Validator::make($request->all(),[
            'location'=>'nullable|string|max:255',
            'type'=>'nullable|in:pickup,dropoff,pickup_dropoff',
            'city_id'=>'nullable|in:pickup,dropoff,pickup_dropoff',
        ]);
        if($validator->fails()){
            $msg=$validator->errors()->first();
            return $this->fail($msg,400);
        }
        $data= $request->only([
            'location','type','car_id'
        ]);
        $location->update($data);
        return $this->success(new SimpleLocationResource($location));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $location=Location::find($id);
        if($location){
        if( $location->delete())
        return $this->success('successfully deleted',200);
        return $this->fail('error while deleteing',500);
    }
    return $this->fail("location doesn't exist",404);
    }
}
