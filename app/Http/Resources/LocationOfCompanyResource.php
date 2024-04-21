<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\LocationResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\LocationOfCompanyResource;

class LocationOfCompanyResource extends JsonResource
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
            'company_Name'=>$this->name,
            'email'=>$this->email,
            'phone'=>$this->phone,
            'photo_user'=>url($this->photo_user),
            'locations'=>LocationResource::collection($this->locations),

        ];
        return parent::toArray($request);
    }
}
