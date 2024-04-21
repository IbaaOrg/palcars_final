<?php

namespace App\Console\Commands;

use App\Models\Bill;
use Illuminate\Console\Command;

class UpdateCarStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'car:update-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update status of cars based on rental start and end times';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Logic to update car status
        $this->updateCarStatus('rented', 'start_date', 'start_time');
        $this->updateCarStatus('returned', 'end_date', 'end_time');
    }
    private function updateCarStatus($status, $dateColumn, $timeColumn)
    {
        $rentals = Bill::whereDate($dateColumn, today())
            ->whereTime($timeColumn, '<=', now()->format('H:i'))
            ->where('status', '!=', $status)
            ->get();

        foreach ($rentals as $rental) {
            $rental->car->update(['status' => $status]);
        }
    }
}
