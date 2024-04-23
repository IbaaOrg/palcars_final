<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use App\Http\Resources\CityResource;
use App\Http\Resources\SimpleUserResource;
use App\Http\Resources\SimpleLocationResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleLocationResource extends JsonResource
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
            'ownerCompany'=>new SimpleUserResource($this->user),
            'created_at'=>$this->created_at->format('Y-m-d H:i:s'),
            'updated_at'=>$this->updated_at->format('Y-m-d H:i:s'),      
        ];
        
        return $data;
        return parent::toArray($request);
    }
}
