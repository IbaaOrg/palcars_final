<?php

namespace App\Http\Controllers\Api;

use App\Models\Car;
use App\Models\User;
use Firebase\JWT\JWT;
use forgetPasswordMail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ResetPassword;
use Illuminate\Support\Carbon;
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
use App\Http\Resources\UserWorkingHourResource;

class UserWorkingHoursController extends Controller
{
    
    use ResponseTrait;
   
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate request data
        $validator=Validator::make($request->all(),[
            'day' => 'required',
    'start_hour' => 'required|date_format:H:i',
    'end_hour' => 'required|date_format:H:i|after:start_hour',
        ]);
        if ($validator->fails()) {
            $msg = $validator->errors()->first();
            return $this->fail($msg, '400');
        }
        $workingHour = new UserWorkingHour();
        $workingHour->user_id = $request->user()->id;
        $workingHour->day = $request->day;
        $workingHour->start_hour = $request->start_hour;
        $workingHour->end_hour = $request->end_hour;
        $workingHour->save();
        
        return $this->success('Working hour saved successfully');
    }

    public function getWorkingHours(Request $request)
    {
        $userId=$request->user()->id;
        $workingHours = UserWorkingHour::where('user_id', $userId)->get();
        return response()->json(['working_hours' => $workingHours]);
    }
    public function updateWorkingHours(Request $request,string $id){
        $validator=Validator::make($request->all(),[
    'start_hour' => 'required|date_format:H:i',
    'end_hour' => 'required|date_format:H:i|after:start_hour',
        ]);
        if($validator->fails()){
            $msg=$validator->errors()->first();
            return $this->fail($msg,404);
        }
        $userWorkingHour=UserWorkingHour::find($id);
        if (!$userWorkingHour) {
            return $this->fail('working hour not found', 404);
        }
        $data=[
            'start_hour' => $request->input('start_hour') ?? $userWorkingHour->start_hour,
            'end_hour' => $request->input('end_hour') ?? $userWorkingHour->end_hour,
        ];
        $userWorkingHour->update($data);
        return $this->success($userWorkingHour);

    }
    /**
     * Display the specified resource.
     */
    public function getAllDatesForWorkingHours(string $day, string $startHour, string $endHour): array
    {
        $dates = [];
    $currentDate = Carbon::now()->startOfDay(); // Start from today
    $nextYear = $currentDate->copy()->addYear(); // Next year from today

        // Loop through all dates from today to the end of the next year
        while ($currentDate->lessThanOrEqualTo($nextYear)) {
            // Check if the current date is the specified day of the week
            if ($currentDate->englishDayOfWeek === $day) {
                // Combine the current date with the start hour to create the start datetime
                $startDateTime = $currentDate->copy()->setTimeFromTimeString($startHour);
    
                // Combine the current date with the end hour to create the end datetime
                $endDateTime = $currentDate->copy()->setTimeFromTimeString($endHour);
    
                // Add the date, start time, and end time to the array of dates
                $dates[] = (object) [
                    'date' => $currentDate->toDateString(),
                    'start_time' => $startDateTime->toTimeString(),
                    'end_time' => $endDateTime->toTimeString(),
                ];
            }
    
            // Move to the next day
            $currentDate->addDay();
        }
    
        return $dates;
    }
    
    public function showAll(string $id)
    {
        $car = Car::find($id);
        if(!$car){
            return $this->fail('car not found',404);
        }
        $user=$car->ownerUser;
        if ($user) {
            $workingHours = [];
            // Iterate through each day of the week
            foreach (['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as $day) {
                // Get the start and end hours for the current day
                $startHour = $user->userWorkingHours()->where('day', $day)->value('start_hour');
                $endHour = $user->userWorkingHours()->where('day', $day)->value('end_hour');
    
                // Check if both start and end hours are not null
                if ($startHour !== null && $endHour !== null) {
                    // Generate dates for the current day and add them to the array
                    $workingHours = array_merge($workingHours, $this->getAllDatesForWorkingHours($day, $startHour, $endHour));
                }
            }
    
            // Sort the array of dates in ascending order
            usort($workingHours, function ($a, $b) {
                return strtotime($a->date . ' ' . $a->start_time) <=> strtotime($b->date . ' ' . $b->start_time);
            });
    
            return $this->success($workingHours);
        }
    
        return $this->fail("Company isn't found", 404);
    }
public function destroy(string $id)
{
    $userWorkingHour=UserWorkingHour::find($id);
    if($userWorkingHour){
     $userWorkingHour->delete();
    return $this->success("successfully deleted");
    }
    return $this->fail('user not found',404);

}
}
