<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use App\Http\Resources\CityResource;
use App\Http\Resources\SimpleUserResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\SimpleLocationShowResource;

class SimpleLocationShowResource extends JsonResource
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
            'location'=>$this->location,
            'city'=>new CityResource($this->city),
                
        ];
        
        return $data;
        return parent::toArray($request);
    }
}
