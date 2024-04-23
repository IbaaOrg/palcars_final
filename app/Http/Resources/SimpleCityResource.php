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
            'created_at'=>$this->created_at->format('Y-m-d H:i:s'),
            'updated_at'=>$this->updated_at->format('Y-m-d H:i:s'),      
        ];
        
        return $data;
        return parent::toArray($request);
    }
}
