<?php

namespace App\Http\Controllers\Api;

use App\Models\Car;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Notifications\createComment;
use App\Http\Resources\CommentResource;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\CommentCarResource;
use Illuminate\Support\Facades\Notification;

class CommentController extends Controller
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
        $validator= Validator::make($request->all(),[
            'comment'=>'required|string',
            'rating'=>'nullable|in:1,2,3,4,5',
            'car_id'=>'required|exists:cars,id',

        ]);
        if($validator->fails()){
            $msg = $validator->errors()->first();
            return $this->fail($msg, '400');
        }
        $body=Comment::create(
            [
                'comment'=>$request->comment,
                'rating'=>$request->rating,
                'user_id'=>$request->user()->id,
                'car_id'=>$request->car_id
            ]
            );
            $car= Car::find($request->car_id);
            $user_comment=$request->user()->name;
            $user_photo=$request->user()->photo_user;
            $words = explode(" ", $body->comment);
            // Extract the first word
            $firstWord = $words[0];
            $content="added a new comment on your car : ".$firstWord."...";
             $car->ownerUser->notify(new createComment($car->id, $user_comment,$user_photo,$content));
            return $this->success(new CommentResource($body));
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
        $comment=Comment::find($id);
        //
        $validator= Validator::make($request->all(),[
            'comment'=>'required|string',
            'rating'=>'nullable|in:1,2,3,4,5',

        ]);
        if ($validator->fails()) {
            $msg = $validator->errors()->first();
            return $this->fail($msg, '400');
        }
       
         $data = [
            'comment'=>$request->comment,
        'rating'=>$request->rating,
        'user_id'=>$request->user()->id,
    ];
$comment->update($data);
return $this->success(new CommentResource($comment));

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $comment=Comment::find($id);
        if($comment){
            $comment->delete();
            return $this->success('successfully deleted');

        }
        return $this->fail('comment not found',404);


    }
    public function getMyComments(Request $request){
        $userComments=Comment::where('user_id',$request->user()->id)->orderBy("created_at","DESC")->get();
        return $this->success(CommentCarResource::collection($userComments));
    }
    public function getAllcomentsOfMyCar(Request $request){
        $user=$request->user();
        $user->load('cars.comments');
        $allUserCarComments = $user->cars->flatMap(function ($car) {
            return $car->comments;
        });
        $allUserCarComments = $allUserCarComments->sortByDesc('created_at');

        return $this->success(CommentCarResource::collection($allUserCarComments));
    }
}
