<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Notifications\createComment;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\MessageResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\OneMessageResource;
use App\Http\Resources\SimpleMessageResource;

class MessageController extends Controller
{
    use ResponseTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = Message::with('user')->get();
        return $this->success(MessageResource::collection($messages));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'message'=>'required',
            'reciever_id'=>'required|exists:users,id',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif',
        ]);
        if ($validator->fails()) {
            $msg = $validator->errors()->first();
            return $this->fail($msg, '400');
        }
        $data= [
        'message'=>$request->message,
        'user_id'=>$request->user()->id,
        'reciever_id'=>$request->reciever_id,
        ];
        if($request->hasFile('photo')){
            $file_user = $request->file('photo');
            $fileName_user = "MessageIMG_" . rand(1000, 9999) . "." . $file_user->getClientOriginalExtension();
            $path_user = $file_user->storeAs('images/Messages', $fileName_user, 'public');
            $photo_Message = Storage::url($path_user);
            $data['photo']=$photo_Message;

        }
       
        $message = Message::create($data);
        $user= User::find($request->reciever_id);
        $user_comment=$request->user()->name;
        $user_photo=$request->user()->photo_user;
        $words = explode(" ", $message->message);
        // Extract the first word
        $firstWord = $words[0];
        $content="Send Messgae of you : ".$firstWord."...";
        $user->notify(new createComment($user->id, $user_comment,$user_photo,$content));
        return $this->success(new SimpleMessageResource($message));
    }

    public function show($id)
    {
        $message = Message::find($id);
        if(!$message)
        return $this->fail('message not found',404);
        return $this->success(new OneMessageResource($message));
    }

    public function update(Request $request, $id)
    {   
        $message = Message::find($id);
        if (!$message) {
            return $this->fail('Message not found', 404);
        }
        $validator = Validator::make($request->all(), [
            'message' => 'nullable|unique:cars,car_number|regex:/^[A-Z]{1,2}-[0-9]{4,5}-[A-Z]{1}$/u',
        ]);
        
        $data = $request->only([
            'message'
        ]);

        $message->update($data);
        return $this->success(new SimpleMessageResource($message));
    }

    public function destroy($id)
    {
        $message = Message::find($id);
        if(!$message){
            return $this->fail('message not found',404);
        }
       if ($message->delete()) {
        return $this->success("Deleted successfully",200);
                            } 
       else {
        return $this->fail("A problem occurred while deleting", 500);
            }
    }
    public function messagesRecieved(){
        // Get the ID of the currently authenticated user
       $user = Auth::user();
        // Retrieve all messages received by the current user
        $receivedMessages = Message::where('reciever_id', $user->id)->get();

        // Return the received messages as a JSON response
        return $this->success(MessageResource::collection($receivedMessages));
    }
    public function messagesSend( ){
        // Get the ID of the currently authenticated user
       $user = Auth::user();

        // Retrieve all messages received by the current user
        $sendMessages = Message::where('user_id', $user->id)->get();

        // Return the received messages as a JSON response
        return $this->success(MessageResource::collection($sendMessages));
    }
    public function allmessagesSend($receverid){
        // Get the ID of the currently authenticated user
        $user = Auth::user();
    
        // Retrieve all messages sent by the current user to the specified receiver
        $sendMessages = Message::where('user_id', $user->id)->where('reciever_id', $receverid)->get();
                               
                                
                                
    
        // Return the sent messages as a JSON response
        return response()->json([
            'status' => true,
            'data' => MessageResource::collection($sendMessages)
        ]);
    }
    public function allmessagesReceived($senderId){
        // Get the ID of the currently authenticated user
        $user = Auth::user();
    
        // Retrieve all messages received by the current user from the specified sender
        $receivedMessages = Message::where('user_id', $senderId)
                                   ->where('reciever_id', $user->id) 
                                   ->get();
    
        // Return the received messages as a JSON response
        return response()->json([
            'status' => true,
            'data' => MessageResource::collection($receivedMessages)
        ]);
    }
    
    
}
