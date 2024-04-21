<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UserInfoResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserInfoResource extends JsonResource
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
            'name'=>$this->name,
            'email'=>$this->email,
            // 'email_verified_at'=>$this->email_verified_at,
            'phone'=>$this->phone,
            'photo_user'=>url($this->photo_user),
            // 'status'=>$this->active=='1'?'Active':'Not Active', 
        
        ];
        if($this->photo_drivinglicense){
           $data['photo_drivinglicense']=url($this->photo_drivinglicense);
        }
        if($this->birthdate){
            $data['birthdate']=$this->birthdate;
        }
        if($this->description){
            $data['description']=$this->description;
        } 
        $data['role']=$this->role;
        $data['token']=$this->token;
        $data['created_at']=$this->created_at->format('Y-m-d H:i:s');
        $data['updated_at']=$this->updated_at->format('Y-m-d H:i:s');
        return $data;
        return parent::toArray($request);
    }
}
