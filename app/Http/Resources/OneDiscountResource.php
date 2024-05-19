<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\OwnerResource;
use App\Http\Resources\CarColorResource;
use App\Http\Resources\CarImageResource;
use App\Http\Resources\PriceCarResource;
use App\Http\Resources\CarImagesResource;
use App\Http\Resources\CarDiscountResource;
use App\Http\Resources\CommentOfCarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class OneDiscountResource extends JsonResource
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
            'type'=>$this->type,
            'value'=>$this->value,
            'expired_date'=>$this->expired_date,
            'car'=>new CarDiscountResource($this->car),
         
        ];
      
       
      
      
        return $data;
        return parent::toArray($request);
    }
}
