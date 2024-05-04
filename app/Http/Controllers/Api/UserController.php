<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use Firebase\JWT\JWT;
use forgetPasswordMail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ResetPassword;
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

class UserController extends Controller
{
    
    use ResponseTrait;
     public function count(Request $request)
    {
        $count = User::count();
        return  $this->success( $count);
    }
    public function infouser(Request $request) {
        return $this->success(new UserInfoResource($request->user()));
    }
    public function register(Request $request){
      

        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3|regex:/^[\pL\s\-]+$/u',
            'email' => 'required|email:rfc,dns|unique:users',
            'phone' => 'required|numeric|regex:/^05[0-9]{8}$/',
            'password' => 'required|string|min:8|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/|regex:/[@$!%*?&-_]/',
            'photo_user' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'photo_drivinglicense' => $request->role === 'Renter'?'required|image|mimes:jpeg,png,jpg,gif':'nullable|image|mimes:jpeg,png,jpg,gif',
            'birthdate' => $request->role === 'Renter' ? 'required|date|before_or_equal:' . Carbon::now()->subYears(18)->format('Y-m-d') : 'nullable' ,
            'description' => 'nullable',
            'role' => 'required|in:Admin,Renter,Company',
        ], [
            'name.required'=>__('Messages.name required'),
            'name.min'=>__('Messages.name.min'),
            'name.regex'=>'your name can only contain letters',
            'password.regex'=>'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'phone.regex'=>'The phone number must contain 10 digits start with (05)',
            'birthdate.before_or_equal' => 'You must be 18 years old or older to register.',
        ]);
    
        if ($validator->fails()) {
            $msg = $validator->errors()->first();
            return $this->fail($msg, '400');
        }
       
        // Process photo_user
        if ($request->hasFile('photo_user')) {
            $file_user = $request->file('photo_user');
            $fileName_user = "UserIMG_" . rand(1000, 9999) . "." . $file_user->getClientOriginalExtension();
            $path_user = $file_user->storeAs('images/users', $fileName_user, 'public');
            $photo_user = Storage::url($path_user);
        } else {
            // Set default photo_user if no image is uploaded
            $photo_user = Storage::url('images/users/user.png');
        }
    
        // Process photo_drivinglicense
        if ($request->hasFile('photo_drivinglicense')) {
            $file_drivinglicense = $request->file('photo_drivinglicense');
            $fileName_drivinglicense = "DrivinglicenseIMG_" . rand(1000, 9999) . "." . $file_drivinglicense->getClientOriginalExtension();
            $path_drivinglicense = $file_drivinglicense->storeAs('images/users', $fileName_drivinglicense, 'public');
            $photo_drivinglicense = Storage::url($path_drivinglicense);
        } else {
            // Set default photo_user if no image is uploaded
            $photo_drivinglicense = null;
        }
       
    
    
        // Create new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'phone' => $request->phone,
            'photo_user' => $photo_user,
            'photo_drivinglicense' => $photo_drivinglicense,
            'birthdate' => $request->birthdate,
            'description' => $request->description,
            'role' => $request->role,
        ]);

        $token=$user->createToken("TokenUser")->plainTextToken;
        $user->token=$token; 

      /* $jwtToken = JWT::encode(['id' => $user], 'your_secret_key', 'HS256');

    // Update user with JWT token
    $user->token=$jwtToken; */
   /*  $user->update(['token' => $jwtToken]); */
      
        return $this->success(new UserResource($user));

    }
  
    public function login(Request $request){
       $validator= Validator::make($request->all(),
            [
                'email'=>'required|exists:users,email',
                'password'=>'required',

            ]
            );
            if($validator->fails()){
                $msg=$validator->errors()->first();
                return $this->fail($msg,'400');
            }
        $email=$request->email;
        $password=$request->password;
        
        if(Auth::attempt(['email'=>$email,'password'=>$password])){
   $user=Auth::user();
            $token=$user->createToken("TokenUser")->plainTextToken;
        $user->token=$token; 
          
           /* $jwtToken = JWT::encode(['id' => $user], 'your_secret_key', 'HS256');
 */
    // Update user with JWT token
   /*  $user->token=$jwtToken; */
            return $this->success(new AuthResource($user));
        }

        return $this->fail( 'Invalid email or password.',403);
        
    }
    public function logout(){
         Auth::logout();
         return $this->success('successfully logout');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
       
            // User is authenticated
            return $this->success(AllUserResource::collection(User::all()));

       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return $this->success(new AllUserResource(User::find($id)));
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
