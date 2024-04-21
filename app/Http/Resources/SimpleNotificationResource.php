<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

use App\Http\Resources\CarResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\SimpleNotificationResource;

class SimpleNotificationResource extends JsonResource
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
            'sender'=>new SimpleUserResource($this->sender),
            'reciver'=>new SimpleUserResource($this->reciver),
            'notification'=>$this->notification,
            'seen'=>$this->seen,
            'created_at'=>$this->created_at->format('Y-m-d H:i:s'),
            'updated_at'=>$this->updated_at->format('Y-m-d H:i:s'),
        ];
     return $data;
    }
}
