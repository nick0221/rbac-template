<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DailyReset extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:daily-reset';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset database and run default migrations + seeds';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Resetting database...');
        $this->call('migrate:fresh', ['--seed' => true, '--force' => true]);
        $this->info('Database reset and seeded!');
    }
}
