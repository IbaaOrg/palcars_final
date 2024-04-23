<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UpdateUserResource extends JsonResource
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
            'role'=>$this->role,           
            'created_at'=>$this->created_at->format('Y-m-d H:i:s'),
            'updated_at'=>$this->updated_at->format('Y-m-d H:i:s'),
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
        return $data;
        return parent::toArray($request);
    }
}
