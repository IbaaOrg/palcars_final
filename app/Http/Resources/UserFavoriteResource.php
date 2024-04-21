<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

use App\Http\Resources\CarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserFavoriteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data=[
            
            'id'=>$this->id,
             'car'=>new CarResource($this->car),


        ];
     return $data;
    }
}
