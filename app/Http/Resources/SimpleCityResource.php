<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\SimpleCityResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleCityResource extends JsonResource
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
        ];
        
        return $data;
        return parent::toArray($request);
    }
}
