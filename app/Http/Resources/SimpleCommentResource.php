<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\OwnerResource;
use App\Http\Resources\SimpleCarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleCommentResource extends JsonResource
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
            'comment'=>$this->comment,
            'created_at'=>$this->created_at->format('Y-m-d H:i:s'),
            'updated_at'=>$this->updated_at->format('Y-m-d H:i:s'),
            'timeago'=>Carbon::parse($this->created_at)->diffForHumans(),
        
        ];
        return $data;
        return parent::toArray($request);
    }
}
