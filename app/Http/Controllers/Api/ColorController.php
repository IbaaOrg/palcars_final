<?php

namespace App\Http\Controllers\Api;

use App\Models\Color;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Http\Resources\ColorResource;
use Illuminate\Support\Facades\Validator;

class ColorController extends Controller
{
    use ResponseTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return $this->success(ColorResource::collection(Color::all()));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'color'=>'unique:colors',
            'hex_value' => ['required', 'string', 'regex:/^#[0-9a-fA-F]{6}$/'],
        ],[
            'color.unique'=>'the color have been already exist'
        ]);
        if($validator->fails()){
            $msg=$validator->errors()->first();
            return $this->Fail($msg, '404');
        }
        //
        $color=Color::create([
            'color'=>$request->color,
            'hex_value'=>$request->hex_value
        ]);
        return $this->success(new ColorResource($color));
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
        $validator = Validator::make($request->all(), [
            'color' => 'required', 
            'hex_value' => ['required', 'string', 'regex:/^#[0-9a-fA-F]{6}$/'],
        ]);
        
        if ($validator->fails()) {
            return $this->fail($validator->errors()->first(), 400); 
        }
        //
        $color=Color::find($id);
        if($color){
        $color->update(['color'=>$request->color,'hex_value'=>$request->hex_value]);
        return $this->success(new ColorResource($color));
        }
        return $this->fail("color doesn't exist",401);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $color=Color::find($id);
        if($color){
        if( $color->delete())
        return $this->success('Done');
        return $this->fail('error while deleteing',400);
    }
       return $this->fail("color doesn't exist",401);

    }
}
