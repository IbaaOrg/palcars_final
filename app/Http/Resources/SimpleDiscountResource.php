<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\CarResource;
use App\Http\Resources\OwnerResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\CarColorResource;
use App\Http\Resources\PriceCarResource;
use App\Http\Resources\SimpleCarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleDiscountResource extends JsonResource
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
            'note'=>$this->note,
            'type'=>$this->type,
            'value'=>$this->value,
            'expired_date'=>$this->expired_date,
            'car_id'=>$this->car_id,
            'created_at'=>$this->created_at->format('Y-m-d H:i:s'),
            'updated_at'=>$this->updated_at->format('Y-m-d H:i:s'),            

           
        ];
        
        return $data;
        return parent::toArray($request);
    }
}
