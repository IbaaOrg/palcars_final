<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\OwnerResource;
use App\Http\Resources\CarColorResource;
use App\Http\Resources\CarImageResource;
use App\Http\Resources\PriceCarResource;
use App\Http\Resources\CarImagesResource;
use App\Http\Resources\CommentOfCarResource;
use App\Http\Resources\PriceDiscountResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CarShowDiscountResource extends JsonResource
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
            'model'=>$this->model,
         
        ];
      
       
      
           $data['sub_images']=CarImageResource::collection($this->images);
           $data['prices']=PriceDiscountResource::collection($this->prices);
        return $data;
        return parent::toArray($request);
    }
}
