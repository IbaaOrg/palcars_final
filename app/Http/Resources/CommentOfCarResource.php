<?php

namespace App\Http\Resources;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Resources\OwnerResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\SimpleCarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentOfCarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
    
        $data= [
            'id' => $this->id,
            'car_number' => $this->car_number,
            'make' => $this->make,
            'model' => $this->model,
            'year' => $this->year,
            'Owner_Of_Car' => new OwnerResource($this->ownerUser),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        
        ];
        if ($this->comments) {
            // Include comments only if the relationship is not null
            $data['comments'] = CommentResource::collection($this->comments);
        }
        return $data;
        return parent::toArray($request);
    }
}
