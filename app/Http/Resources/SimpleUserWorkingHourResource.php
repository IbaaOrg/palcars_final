<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UserWorkingHourResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\SimpleUserWorkingHourResource;

class SimpleUserWorkingHourResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        return [
            'day'=> $this->day,
            'start_hour'=> $this->start_hour,
            'end_hour'=> $this->end_hour,

        ];
        return parent::toArray($request);
    }
}
