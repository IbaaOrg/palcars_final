<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\SimpleMethodResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleMethodResource extends JsonResource
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
            'method'=>$this->method,
    

        ];
        return parent::toArray($request);
    }
}
