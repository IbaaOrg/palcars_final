<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\OwnerResource;
use App\Http\Resources\BillCarResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\CarColorResource;
use App\Http\Resources\PriceCarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class BillCarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
    
        $data=[
            'id'=> $this->id,
            'car_number'=>$this->car_number,
            'make'=>$this->make,
            'model'=>$this->model,
            'catrgory'=>$this->catrgory,
            'year'=>$this->year,  
            'status'=>$this->status,
            'owner'=>new OwnerResource($this->ownerUser),
            'sub_images'=>CarImageResource::collection($this->images),
            'prices'=>PriceCarResource::collection($this->prices),
           
        ];
        
        return $data;
        return parent::toArray($request);
    }
}