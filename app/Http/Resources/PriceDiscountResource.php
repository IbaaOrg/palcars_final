<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PriceDiscountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data= [
                'id'=>$this->id,
                'price'=>$this->price,
                'price_after_discount'=>$this->price_after_discount,

        ];
        return $data;
        return parent::toArray($request);
    }
}
