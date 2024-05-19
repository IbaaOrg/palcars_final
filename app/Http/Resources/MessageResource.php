<?php

namespace App\Http\Resources;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\SimpleUserResource;
use App\Http\Resources\SimpleMessageResource;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $sender = User::find($this->user_id);
        $receiver = User::find($this->reciever_id);
    
        $data=[
            'id'=> $this->id,
            'message'=>$this->message,
            'sender'=>new SimpleUserResource($sender),
            'reciever'=>new SimpleUserResource($receiver),
            'created_at'=>$this->created_at->format('Y-m-d H:i:s'),
            'updated_at'=>$this->updated_at->format('Y-m-d H:i:s'),   
            'timeago'=>Carbon::parse($this->created_at)->diffForHumans(),  
   
        ];
        if($this->photo){
            $data['photo']=url($this->photo);
        }
        
        return $data;
        return parent::toArray($request);
    }
}
