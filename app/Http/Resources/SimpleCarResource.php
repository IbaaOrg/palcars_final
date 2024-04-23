<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\OwnerResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\CarColorResource;
use App\Http\Resources\PriceCarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleCarResource extends JsonResource
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
            'status'=>$this->status,
            'sub_images'=>CarImageResource::collection($this->images),
            'prices'=>PriceCarResource::collection($this->prices),
            'reviews'=>SimpleCommentResource::collection($this->comments),
            'car_color'=>new CarColorResource($this->color),

           
        ];
        
        return $data;
        return parent::toArray($request);
    }
}
