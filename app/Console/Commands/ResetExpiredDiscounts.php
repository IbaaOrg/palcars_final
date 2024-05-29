<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Price;
use App\Models\Discount;
use Illuminate\Console\Command;

class ResetExpiredDiscounts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reset-expired-discounts';
    protected $description = 'Reset prices for cars with expired discounts';

    /**
     * The console command description.
     *
     * @var string
     */

    /**
     * Execute the console command.
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        //
        $now=Carbon::now();
        $expiredDiscounts= Discount::where('expired_date','<=',$now)->get();
        foreach($expiredDiscounts as $discount){
            $this->resetPrices($discount);
        }
        return Command::SUCCESS;
    }
    protected function resetPrices($discount){
        $prices= Price::where('car_id',$discount->car_id)->get();
        foreach($prices as $price){
            $originalPrice=$price->price;
            $price->price_after_discount= $originalPrice;
            $price->price_per_hour=$originalPrice / 24;
            $price->save();

        }
    }
}
