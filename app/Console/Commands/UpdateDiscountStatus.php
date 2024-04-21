<?php

namespace App\Console\Commands;

use App\Models\Discount;
use Illuminate\Console\Command;

class UpdateDiscountStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'discounts:update';


    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update active status for discounts';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $discounts = Discount::where('expired_date', '<=', now())->where('active', 1)->get();
        foreach ($discounts as $discount) {
            $discount->update(['active' => 0]);
        }
        $this->info('Discount statuses updated successfully.');


    }
}
