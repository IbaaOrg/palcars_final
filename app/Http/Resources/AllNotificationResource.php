<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\AllNotificationResource;
use Illuminate\Http\Resources\Json\JsonResource;

class AllNotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'notifiable_type' => $this->notifiable_type,
            'notifiable_id' => $this->notifiable_id,
            'data' => [
                'comment_id' => $this->data['comment_id'],
                'comment_create' => $this->data['comment_create'],
                'user_photo' => url($this->data['user_photo']),
                'content' => $this->data['content'],
            ],
            'read_at' => $this->read_at,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'timeago'=>Carbon::parse($this->created_at)->diffForHumans(),

        ];
        return parent::toArray($request);
    }
}
