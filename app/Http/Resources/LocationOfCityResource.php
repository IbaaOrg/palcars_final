<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use App\Http\Resources\CityResource;
use App\Http\Resources\SimpleUserResource;
use App\Http\Resources\LocationCityResource;
use App\Http\Resources\LocationOfCityResource;
use App\Http\Resources\SimpleLocationResource;
use Illuminate\Http\Resources\Json\JsonResource;

class LocationOfCityResource extends JsonResource
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
            'city'=>$this->city,
            'locations'=>LocationCityResource::collection($this->locations),
        ];
        
        return $data;
        return parent::toArray($request);
    }
}
