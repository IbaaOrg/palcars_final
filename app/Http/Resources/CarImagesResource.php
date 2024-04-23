<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\OwnerResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CarImagesResource extends JsonResource
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
            'car_number'=>$this->car_number,
            'make'=>$this->make,
            'model'=>$this->model,
            'catrgory'=>$this->catrgory,
            'year'=>$this->year,           
            'seats'=>$this->seats,
            'doors'=>$this->doors,
            'sub_images'=>CarImageResource::collection($this->images),

        ];

        return $data;
        return parent::toArray($request);
    }
}
