<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\CarResource;
use App\Http\Resources\SimpleCarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CarsOfUserResource extends JsonResource
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
            'cars'=>CarResource::collection($this->cars),
        ];
        return parent::toArray($request);
    }
}
