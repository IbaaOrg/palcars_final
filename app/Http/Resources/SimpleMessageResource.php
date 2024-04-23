<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\SimpleMessageResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleMessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
    
        $data=[
            'id'=> $this->id,
            'message'=>$this->message,
            'sender'=>$this->user_id,
            'reciever'=>$this->reciever_id,
            'created_at'=>$this->created_at->format('Y-m-d H:i:s'),
            'updated_at'=>$this->updated_at->format('Y-m-d H:i:s'),      
        ];
        if($this->photo){
            $data['photo']=url($this->photo);
        }
        
        return $data;
        return parent::toArray($request);
    }
}
