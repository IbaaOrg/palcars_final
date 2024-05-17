<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\CityResource;
use App\Http\Resources\BillCarResource;
use App\Http\Resources\LocationResource;
use App\Http\Resources\SimpleCarResource;
use App\Http\Resources\SimpleUserResource;
use App\Http\Resources\SimpleMethodResource;
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
            'user_id' => new SimpleUserResource($this->user),
            'phone'=>$this->phone,
            'address'=>$this->address,
            'city'=>new CityResource($this->city),
            'amount'=>$this->amount,
            'car'=>new BillCarResource($this->car),
            'method'=>new SimpleMethodResource($this->method),
            'amount'=>$this->amount,
            'pickup_location'=>new LocationResource($this->pickup_location),
            'dropoff_location'=>new LocationResource($this->dropoff_location),
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
