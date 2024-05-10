<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\OwnerResource;
use App\Http\Resources\CarColorResource;
use App\Http\Resources\CarImageResource;
use App\Http\Resources\PriceCarResource;
use App\Http\Resources\CarImagesResource;
use App\Http\Resources\CommentOfCarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CarResource extends JsonResource
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
            'seats'=>$this->seats,
            'doors'=>$this->doors,
            'status'=>$this->status,
            'description'=>$this->description
         
        ];
      
        if($this->bags){
            $data['bags']=$this->bags;
        }
        if($this->fuel_full){
        } 
                 $data['fuel_full']=$this->fuel_full;

           $data[ 'fuel_type']=$this->fuel_type;
           $data['steering']=$this->steering;
           $data['owneruser']=new OwnerResource($this->ownerUser);
           $data['sub_images']=CarImageResource::collection($this->images);
           $data['prices']=PriceCarResource::collection($this->prices);
           $data['reviews']=CommentResource::collection($this->comments);
           $data['car_color']=new CarColorResource($this->color);
            $data['created_at']=$this->created_at->format('Y-m-d H:i:s');
            $data['updated_at']=$this->updated_at->format('Y-m-d H:i:s');
        return $data;
        return parent::toArray($request);
    }
}
