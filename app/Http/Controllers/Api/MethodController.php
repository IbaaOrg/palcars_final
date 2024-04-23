<?php

namespace App\Http\Controllers\Api;

use App\Models\Method;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Http\Resources\MethodResource;
use Illuminate\Support\Facades\Validator;

class MethodController extends Controller
{
    use ResponseTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $methods=Method::all();
        return $this->success(MethodResource::collection($methods));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function insert(Request $request)
    {
        $method=Method::create([
            'method'=>$request->method,
           ]);
           return $this->success(new MethodResource($method));

        /*$validator = Validator::make($request->all(), [
            'method'=>'required|exists:methods,method'
        ]);
        if ($validator->fails()) {
            $msg = $validator->errors()->first();
            return $this->fail($msg, '400');
        }*/

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Method::find($id); // استرجاع سجل محدد بالمعرف
        return $this->success(new MethodResource($data));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $newMethod = $request->method;
        $method = Method::find($id);
        if(!$method){
            return $this->fail('method not found',404);
        }
        $method->update(['method' => $newMethod]);
        return $this->success(new MethodResource($method));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       $method = Method::find($id);
    
        if (!$method) {
         return $this->fail("The method does not exist", 404);
                    }
 
        if ($method->delete()) {
         return $this->success("Deleted successfully",200);
                             } 
        else {
         return $this->fail("A problem occurred while deleting", 500);
             }
    }
}
