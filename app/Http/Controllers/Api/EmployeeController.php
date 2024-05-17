<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\City;
use App\Models\User;
use App\Models\Employee;
use App\Models\Location;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\LocationOfCityResource;
use App\Http\Resources\SimpleLocationResource;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Resources\LocationOfCompanyResource;
use App\Http\Resources\SimpleLocationShowResource;


class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use ResponseTrait; 
  
    /**
     * Store a newly created resource in storage.
     */
    public function show(string $id)
    {
        return $this->success(Employee::find($id));
    }
       public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'full_name'=>'required|string|max:255',
            'email' => 'required|email:rfc,dns|unique:employees',
            'phone' => 'required|numeric|regex:/^05[0-9]{8}$/',
            'location'=>'required',
            'job_title'=>'required',
            'start_date'=>'required|date|before_or_equal:' . Carbon::now()->format('Y-m-d')
        
        ]);
        if($validator->fails()){
            $errors=$validator->errors()->first();
            return $this->fail($errors,'400');
        }

        $data=[
            'full_name'=>$request->full_name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'location'=>$request->location,
            'job_title'=>$request->job_title,
            'start_date'=>$request->start_date,
            'user_id'=>$request->user()->id,
        ];
       

        $employee=Employee::create($data);
        return $this->success(($employee));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $employee=Employee::find($id);
        if(!$employee){
            return $this->fail("employee isn't exist",404);
        }
        $validator=Validator::make($request->all(),[
            'full_name'=>'nullable|string|max:255',
            'email' => 'nullable|email:rfc,dns|unique:employees',
            'phone' => 'nullable|numeric|regex:/^05[0-9]{8}$/',
            'location'=>'nullable',
            'job_title'=>'nullable',
            'start_date'=>'nullable|date|before_or_equal:' . Carbon::now()->format('Y-m-d')
         ]);
        if($validator->fails()){
            $msg=$validator->errors()->first();
            return $this->fail($msg,400);
        }
        $data= $request->only([
            'full_name','email','phone','location','job_title','start_date'
        ]);
        $employee->update($data);
        return $this->success(($employee));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employee=Employee::find($id);
        if($employee){
        if( $employee->delete())
        return $this->success('successfully deleted',200);
        return $this->fail('error while deleteing',500);
       }
       return $this->fail("employee doesn't exist",404);
    }
    public function EmployeesOfUser(Request $request){
        $user=$request->user();
        $user->employees=$user->employees;
        return $this->Success(($user));
}
}
