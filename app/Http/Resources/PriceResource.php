<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PriceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->id,
            'price'=>$this->price,
            'price_per_hour'=>$this->price_per_hour,
            'price_after_discount'=>$this->price_after_discount,
            'car_id'=>$this->car_id,
            'created_at'=>$this->created_at->format('Y-m-d H:i:s'),
            'updated_at'=>$this->updated_at->format('Y-m-d H:i:s'),

        ];
        return parent::toArray($request);
    }
}
