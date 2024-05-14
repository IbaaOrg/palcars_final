<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UserWorkingHourResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\SimpleUserWorkingHourResource;

class UserWorkingHourResource extends JsonResource
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
            'userWorkingHours'=> SimpleUserWorkingHourResource::collection($this->userWorkingHours),

        ];
        return parent::toArray($request);
    }
}
