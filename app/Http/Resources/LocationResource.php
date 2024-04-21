<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use App\Http\Resources\CityResource;
use App\Http\Resources\SimpleUserResource;
use App\Http\Resources\SimpleLocationResource;
use Illuminate\Http\Resources\Json\JsonResource;

class LocationResource extends JsonResource
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
            'type'=>$this->type,
            'city'=>new CityResource($this->city),   
        ];
        
        return $data;
        return parent::toArray($request);
    }
}
