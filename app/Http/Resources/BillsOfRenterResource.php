<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\SimpleBillResource;
use Illuminate\Http\Resources\Json\JsonResource;

class BillsOfRenterResource extends JsonResource
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
            'renter_Name'=>$this->name,
            'bills'=>SimpleBillResource::collection($this->bills),

        ];
        return parent::toArray($request);
    }
}
