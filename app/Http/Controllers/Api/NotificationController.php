<?php

namespace App\Http\Controllers\Api;

use App\Models\Note;
use App\Models\User;
use App\Rules\RenterRole;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Notifications\createComment;
use App\Http\Resources\NotesResource;
use Kreait\Firebase\Messaging\Message;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\SimpleUserResource;
use Kreait\Firebase\Messaging\CloudMessage;
use App\Http\Resources\AllNotificationResource;
use App\Http\Resources\SimpleNotificationResource;
use Kreait\Firebase\Messaging\Notification as FcmNotification;

class NotificationController extends Controller
{
    use ResponseTrait;
    public function sendNoteToAllRenters(Request $request){
        $validator=Validator::make($request->all(),[
            'note'=>'required|string|max:255',
        ]);
        if($validator->fails()){
            $errors = $validator->errors()->first();
            return $this->fail($errors, '400');
        }
        //get all renters
        $renters=User::where('role','Renter')->get();
        // $notificationContent=$request->input('notification');
        // $this->sendFirebaseNotificationToUsers($renters, $notificationContent);
        if(!$renters){
            return $this->fail('no renters',404);
        }
        $receiver_id=$request->receiver_id;
        $note=$request->note; 
        foreach($renters as $renter){
            Note::create([
                'note'=>$note,
                'receiver_id'=>$renter->id,
                'user_id'=>$request->user()->id,
            ]);
        }


        $notifications=[];
        $sender=$request->user()->name;
        $words = explode(" ", $request->note);
        // Extract the first word
        $firstWord = $words[0];
        $notification="added a new noted for you : ".$firstWord."...";
        foreach($renters as $renter){
            $renter->notify(new createComment($renter->id, $sender,$request->user()->photo_user,$notification));
        }

        return $this->success('successfully sent to all renters');
    }
    public function  sendNoteToSpeceficUser(Request $request){
        $validator=Validator::make($request->all(),[
            'note'=>'required|string|max:255',
            'receiver_id' => 'required|exists:users,id'
        ]);
        if($validator->fails()){
            $errors = $validator->errors()->first();
            return $this->fail($errors, '400');
        }
        $sender=$request->user()->name;
        $receiver_id=$request->receiver_id;
        $note=$request->note; 
        $data=[
            'note'=>$note,
            'receiver_id'=>$receiver_id,
            'user_id'=>$request->user()->id,
        ];
        $finalnote=Note::create($data);
        $renter=User::find( $receiver_id);
        if (!$renter) {
            return $this->fail("Receiver not found", 400);
        }
        if( $renter->role!=="Renter")
            return $this->fail("reciver isn't renter",400);
        $words = explode(" ", $request->note);
        // Extract the first word
        $firstWord = $words[0];
        $note="added a new noted for you : ".$firstWord."...";
        $renter->notify(new createComment($renter->id, $sender,$request->user()->photo_user,$note));
        return $this->success('succesfully send note to specific user');
}

   public function getAllRecivedNotes(Request $request){
    $userId=$request->user()->id;
    $recivedNotes=Note::where('receiver_id',$userId)->orderBy('created_at', 'desc')->get();
    return $this->success(NotesResource::collection($recivedNotes));
}
public function getAllSendNotes(Request $request){
    $userId=$request->user()->id;
    $sendNotes=Note::where('user_id',$userId)->orderBy('created_at', 'desc')->get();
    return $this->success(NotesResource::collection($sendNotes));
}
//     protected function sendFirebaseNotificationToUsers($users, $content)
//     {
//         $message = CloudMessage::new()->withNotification(['title' => 'you recieved notification', 'body' => $content]);

//         $tokens=[];
//         foreach($users as $user){
//             $tokens[] = $user->device_token;
//             app('firebase.messaging')->sendMulticast($message, $tokens);

//         }

//         app('firebase.messaging')->sendMulticast($message, $tokens);
//     }
    public function countNotifications(Request $request){
        $unreadcount=$request->user()->unreadNotifications->count();
        if($unreadcount)
        return $this->success(['unread_count' => $unreadcount]);
    else 
    return $this->success(['unread_count' => 0]);

    }
    public function allNotifications(Request $request){
        $notifications = $request->user()->unreadNotifications;
        return $this->success(AllNotificationResource::collection($notifications));
    }
    public function marksAllRead(Request $request){
        
        $user= $request->user();
        foreach($user->unreadNotifications as $notification){
            $notification->delete();
        }
        if($user)
        return $this->success('all notifications read');
    }
    // protected function sendFirebaseNotificationToUser($user, $content)
    // {
    //     $message = CloudMessage::new()->withNotification(['title' => 'Your notification title', 'body' => $content]);

    //     app('firebase.messaging')->send($user->device_token, $message);
    // }

    // /**
    //  * Display a listing of the resource.
    //  */
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
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
       $note= Note::find($id);
       if($note){
            // Retrieve the records matching the condition
 $notifications = DB::table('notifications')->where('data->comment_id', $id)->get();
 
 // Update each notification record
 foreach ($notifications as $notification) {
     DB::table('notifications')->where('id', $notification->id)->update(['read_at' => now()]);
 }
        return $this->success(new NotesResource($note));
       }
       return $this->fail('notification not found',404);
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
    }
}
