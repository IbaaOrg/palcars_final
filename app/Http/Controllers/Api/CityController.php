<?php

namespace App\Http\Controllers\Api;
use App\Models\City;
use App\Models\Location;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\SimpleCityResource;


class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use ResponseTrait;
    public function index()
    {
        $data=City::all();
        return $this->success(SimpleCityResource::collection($data));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(), [
            'city'=> 'required',
        ]);

        if ($validator->fails()) {
            
            $errors = $validator->errors()->first();
            return $this->fail($errors, '400');
        }
           
            $city=City::create([
             'city'=>$request->city,
            ]);
            return $this->success(new SimpleCityResource($city));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = City::find($id); // استرجاع سجل محدد بالمعرف
        return $this->success($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $newCity = $request->city;
        $city = City::find($id);
        if(!$city){
            return $this->fail('city not found',404);
        }
        $city->update(['city' => $newCity]);
        return $this->success(new SimpleCityResource($city));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       $city = City::find($id);
    
       if (!$city) {
        return $this->fail("The city does not exist", 404);
                   }

       if ($city->delete()) {
        return $this->success("Deleted successfully",200);
                            } 
       else {
        return $this->fail("A problem occurred while deleting", 500);
            }
    }
}
