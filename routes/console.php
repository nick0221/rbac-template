<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Console\Scheduling\Schedule;

// Artisan::command('inspire', function () {
//     $this->comment(Inspiring::quote());
// })->purpose('Display an inspiring quote');

$schedule = app()->make(Schedule::class);
$schedule->command('migrate:daily-reset', ['--force' => true, '--seed' => true])
            ->daily();

