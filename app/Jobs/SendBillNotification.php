<?php

namespace App\Jobs;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendBillNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $now = Carbon::now();
        $startBills= Bill::where('start_date','=',$now->toDateString())
        ->where('start_time','=',$now->addHours(5)->format('H:i'))
        ->get();

        foreach($startBills as $bill){
            $this->sendNotification($bill," will start after 5 hours. ");
        }
        $now= Carbon::now();
        $endBills=Bill::where('end_date','=',$now->toDateString())
        ->where('end_date','=',$now->addHours(5)->format('H:i'))
        ->get();

        foreach($endBills as $bill){
            $this->sendNotification($bill, " will end after 5 hours.");
        }
    }
    protected function sendNotification($bill,$message)
    {
        $user=User::find($bill->user_id);
        $car = $bill->car;
        $user_comment = $car->ownerUser->name;
        $user_photo = $car->ownerUser->photo_user;
        $words = explode(" ", $car->make," ",$car->model);
        $content="Your booking".$words[0].$words[1].$message;
        $user->notify(new CreateComment($car->id, $user_comment, $user_photo, $content));

    }

}
