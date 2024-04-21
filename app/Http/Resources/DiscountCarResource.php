<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\OwnerResource;
use App\Http\Resources\DiscountResource;
use App\Http\Resources\SimpleDiscountResource;
use Illuminate\Http\Resources\Json\JsonResource;

class DiscountCarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data= [
            'id' => $this->id,
            'car_number' => $this->car_number,
            'make' => $this->make,
            'model' => $this->model,
            'year' => $this->year,
            'Owner_Of_Car' => new OwnerResource($this->ownerUser),        
        ];
        if ($this->discounts) {
            // Include comments only if the relationship is not null
            $data['discounts'] = DiscountResource::collection($this->discounts);
        }
        return $data;
        return parent::toArray($request);
    }
}
