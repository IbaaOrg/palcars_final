<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\PriceCarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PricesCarResource extends JsonResource
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
            'prices'=>PriceCarResource::collection($this->prices),
        ];
        return $data;
        return parent::toArray($request);
    }
}
