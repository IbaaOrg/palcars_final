<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleBillResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
{
    if ($this->resource instanceof \Illuminate\Database\Eloquent\Model) {
        // Make sure $this->resource is an instance of a single model
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'amount'=>$this->amount,
            'car_id'=>$this->car_id,
            'method_id'=>$this->method_id,
            'discount_id'=>$this->discount_id,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    } else {
        // Handle the case where $this->resource is a collection
        return parent::toArray($request);
    }
}

}
