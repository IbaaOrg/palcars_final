<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class createComment extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    private $comment_id;
    private $comment_create;
    private $user_photo;
    private $content;
    public function __construct($comment_id,$comment_create,$user_photo,$content)
    {
        //
        $this->comment_id= $comment_id;
        $this->comment_create=$comment_create;
        $this->user_photo=$user_photo;
        $this->content=$content;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    
    public function toArray(object $notifiable): array
    {
        return [
            //
            'comment_id'=>$this->comment_id,
            'comment_create'=>$this->comment_create,
            'user_photo'=>$this->user_photo,
            'content'=>$this->content
        ];

    }
}
