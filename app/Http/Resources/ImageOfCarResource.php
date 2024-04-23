<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\OwnerResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageOfCarResource extends JsonResource
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
            'photo_car'=>url($this->photo),
            'car_id'=>$this->car_id,
            'created_at'=>$this->created_at->format('Y-m-d H-i-s'),
            'updated_at'=>$this->updated_at->format('Y-m-d H-i-s'),
        ];

        return $data;
        return parent::toArray($request);
    }
}
