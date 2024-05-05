<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\OwnerResource;
use App\Http\Resources\CarColorResource;
use App\Http\Resources\CarImageResource;
use App\Http\Resources\PriceCarResource;
use App\Http\Resources\CarImagesResource;
use App\Http\Resources\CommentOfCarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CarDiscountResource extends JsonResource
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
         
        ];
      
       
      
           $data['sub_images']=CarImageResource::collection($this->images);
           $data['prices']=PriceCarResource::collection($this->prices);
            $data['created_at']=$this->created_at->format('Y-m-d H:i:s');
            $data['updated_at']=$this->updated_at->format('Y-m-d H:i:s');
        return $data;
        return parent::toArray($request);
    }
}
