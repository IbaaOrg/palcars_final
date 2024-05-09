<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use Firebase\JWT\JWT;
use forgetPasswordMail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ResetPassword;
use App\Models\UserWorkingHour;
use App\Http\Traits\ResponseTrait;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\Controller;
use App\Http\Resources\AuthResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use App\Http\Resources\AllUserResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\UserInfoResource;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\CarsOfUserResource;
use App\Http\Resources\UpdateUserResource;

class UserWorkingHoursController extends Controller
{
    
    use ResponseTrait;
   
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'working_days'=>'required|array',
            'working_days.*' => 'in:Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
            'start_hour'=>'required|date_format:H:i',
            'end_hour'=>'required|date_format:H:i|after:start_hour',
        ]);
        if($validator->fails()){
            $msg=$validator->errors()->first();
            return $this->fail($msg,'400');
        }
        $workingHours=UserWorkingHour::create([
            'user_id'=>$request->user()->id,
            'working_days' =>json_encode($request->working_days ),
            'start_hour'=>$request->start_hour,
            'end_hour'=>$request->end_hour,
        ]);
        return $this->success($workingHours);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return $this->success(new AllUserResource(User::find($id)));
    }
    public function showAll(Request $request)
    {
        $userWorkingHours = UserWorkingHour::all();
    
        $userWorkingHoursArray = $userWorkingHours->map(function ($item) {
            $workingDays = json_decode($item['working_days'], true); // Decode the JSON string
            $item['working_days'] = array_values($workingDays); // Re-index the array with numeric keys
            return $item;
        });
    
        return $this->success($userWorkingHoursArray);
    }
    

    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return $this->fail('User not found', 404);
        }
    
       
    
        // Prepare data for update
        $data = [
            'name' => $request->input('name') ?? $user->name,
            'phone' => $request->input('phone') ?? $user->phone,
            'password' => $request->input('password') ?? $user->password,
        ];
    
        // Process photo_user
        if ($request->hasFile('photo_user')) {
            $file_user = $request->file('photo_user');
            $fileName_user = "UserIMG_" . rand(1000, 9999) . "." . $file_user->getClientOriginalExtension();
            $path_user = $file_user->storeAs('images/users', $fileName_user, 'public');
            $data['photo_user'] = Storage::url($path_user);
    
            // Delete old photo_user
            if ($user->photo_user) {
                $oldPhotoPath = public_path($user->photo_user);
                if (File::exists($oldPhotoPath)) {
                    File::delete($oldPhotoPath);
                }
            }
        }
    
        // Process photo_drivinglicense
        if ($request->hasFile('photo_drivinglicense')) {
            $file_drivinglicense = $request->file('photo_drivinglicense');
            $fileName_drivinglicense = "DrivinglicenseIMG_" . rand(1000, 9999) . "." . $file_drivinglicense->getClientOriginalExtension();
            $path_drivinglicense = $file_drivinglicense->storeAs('images/users', $fileName_drivinglicense, 'public');
            $data['photo_drivinglicense'] = Storage::url($path_drivinglicense);
    
            // Delete old photo_drivinglicense if exists
            if ($user->photo_drivinglicense) {
                $oldPhotoPath = public_path($user->photo_drivinglicense);
                if (File::exists($oldPhotoPath)) {
                    File::delete($oldPhotoPath);
                }
            }
        }
    
        // Update user data
        $user->update($data);
    
        return $this->success(new UserResource($user));
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user=User::find($id);
        if($user){
         $user->delete();
        return $this->success("successfully deleted");
        }
        return $this->fail('user not found',404);

    }
    public function forgetPassword(Request $request)
    {
        try {
            // Check if user exists
            $user = User::where('email', $request->email)->firstOrFail();
    
            // Generate a secure token
            $token=$user->createToken("TokenUser")->plainTextToken;
            $email=$user->email;
           /*  $token = Str::random(60); */
    
            // Generate password reset URL
            $url = URL::to('/password_reset?token=' . $token.'&email='.$email);
            $data['url']=$url;
            $data['email']=$request->email;
            $data['title']="Password Reset";
            $data['body']="Please click on the link below to reset your password.";
            // Send password reset email
            Mail::send('forgetPasswordMail',['data'=>$data], function ($message) use ($request) {
                $message->to($request->email)->subject("Password Reset");
            });
    
            // Save token in database
            ResetPassword::updateOrCreate(
                ['email' => $request->email],
                ['token' => $token]
            );
    
            return $this->success('Please check your email to reset your password.');
        } catch (\Exception $e) {
            return $this->fail($e->getMessage(), 401);
        }
    }

    public function resetPassword(Request $request)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
            'token' => 'required|string',
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        // Find user by email
        $user = User::where('email', $request->email)->first();

        // Check if user exists
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Verify password reset token
        $resetPassword = ResetPassword::where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$resetPassword) {
            return response()->json(['error' => 'Invalid or expired token'], 400);
        }

        // Update user password
        $user->password = $request->password;
        $user->save();

        // Delete password reset token from database
        $resetPassword->delete();

        return response()->json(['message' => 'Password reset successfully'], 200);
    }
    public function carsOfUser(Request $request){
            $user=$request->user();
            $user->cars=$user->cars;
            return $this->Success(new CarsOfUserResource($user));
    }

      public function authuser()
    {
         
        return response()->json(['user' => Auth::user()]);
    }
    public function carsOfChosenCompany(string $id){
        $user=User::find($id);
        if($user){
            $user->cars=$user->cars;
            return $this->Success(new CarsOfUserResource($user));
        }
        return $this->fail("company isn't found",404);
    }

    public function getUser(Request $request){
        $user = $request->user();
        return $this->Success(new AllUserResource($user));
           return $request->user();

    }
    public function getRenters(Request $request){
        $renterUsers = User::where('role', 'renter')->get();
        return $this->success(AllUserResource::collection($renterUsers));
    }
}
