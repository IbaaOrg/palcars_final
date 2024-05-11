<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\CarReource;
use App\Http\Resources\CarResource;
use App\Http\Resources\OwnerResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\CarColorResource;
use App\Http\Resources\PriceCarResource;
use App\Http\Resources\SimpleCarResource;
use App\Http\Resources\CarDiscountResource;
use App\Http\Resources\CarShowDiscountResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowAllDiscountsResource extends JsonResource
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
            'car'=>new CarShowDiscountResource($this->car),
            
           
        ];
        
        return $data;
        return parent::toArray($request);
    }
}
