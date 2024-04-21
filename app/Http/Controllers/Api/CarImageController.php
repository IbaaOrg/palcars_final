<?php

namespace App\Http\Controllers\Api;
use App\Models\CarImage;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\CarImageResource;
use App\Http\Resources\CarImagesResource;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ImageOfCarResource;

class CarImageController extends Controller
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
        //
        $validator=Validator::make($request->all(),[
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,avif',
            'car_id'=>'required|exists:cars,id'
        ],[
            'car_id.exists'=>"this car doesn't exist in db"
        ]);
        if($validator->fails()){
            $msg=$validator->errors()->first();
            return $this->fail($msg,'400');
        }
         // Process photo_user
         if ($request->hasFile('photo')) {
            $file_car= $request->file('photo');
            $fileName_car = "CarIMG_" . rand(1000, 9999) . "." . $file_car->getClientOriginalExtension();
            $path_car = $file_car ->storeAs('images/cars', $fileName_car , 'public');
            $photo_car  = Storage::url($path_car );
        } else {
            // Set default photo_user if no image is uploaded
            $photo_car  = Storage::url('images/users/car.jpeg');
        }

        $images=CarImage::create([
            'photo' => $photo_car,
            'car_id'=>$request->car_id,
        ]);
        return $this->success(new ImageOfCarResource($images)); 
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
        $image=CarImage::find($id);
// Extract the filename from the photo URL
if($image){
$fileName = basename($image->photo);

// Define the path to the image file in the storage directory
$filePath = 'public/images/users/' . $fileName;

// Check if the file exists
if (Storage::exists($filePath)) {
    // Delete the file from storage
    Storage::delete($filePath);
}
        
        if($image){
            $image->delete();
        return $this->success("successfully deleted");
        }
    }
        return $this->fail('Image not found',404);

    }
}
