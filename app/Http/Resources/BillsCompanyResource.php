<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\CarReource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\SimpleLocationShowResource;

class BillsCompanyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
    
        $data=[
            "id"=> $this->id,
            "name"=> $this->name,
            "phone"=> $this->phone,
            "amount"=> $this->amount,
            "car" => new CarReource($this->car),
            "pickup_location"=> new SimpleLocationShowResource($this->pickup_location),
            "dropoff_location"=> new SimpleLocationShowResource($this->dropoff_location),
            "start_date"=>$this->start_date ,
            "start_time"=>$this->start_time,
            "end_date"=>$this->end_date,
            "end_time"=>$this->end_time,
        
        ];
      
        return $data;
        return parent::toArray($request);
    }
}
