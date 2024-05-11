<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AllUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        return [
            'id'=> $this->id,
            'name'=>$this->name,
            'email'=>$this->email,
            'phone'=>$this->phone,
            'photo_user'=>url($this->photo_user),
            'valid'=>$this->valid,
            'expireddate'=>$this->expireddate,
            'photo_drivinglicense'=>$this->role=='Renter'?$this->photo_drivinglicense?url($this->photo_drivinglicense):null:null,
            'birthdate'=>$this->role=='Renter'?$this->birthdate?$this->birthdate:null:null,
            'role'=>$this->role,
            'birthdate'=>$this->birthdate,           
            'created_at'=>$this->created_at->format('Y-m-d H:i:s'),
            'updated_at'=>$this->updated_at->format('Y-m-d H:i:s'),

        ];
        return parent::toArray($request);
    }
}
