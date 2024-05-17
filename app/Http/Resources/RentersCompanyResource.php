<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RentersCompanyResource extends JsonResource
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
            'photo_user'=>url($this->photo_user),
            'photo_drivinglicense'=>url($this->photo_drivinglicense),
            'expireddate'=>$this->expireddate,
            'points'=>$this->points,
            'rental_count'=>$this->rental_count
        
        ];
      
        return $data;
        return parent::toArray($request);
    }
}
