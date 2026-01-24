<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        for ($i = 1; $i <= 30; $i++) {
            User::factory()->create([
                'name' => 'User '.$i,
                'email' => 'user'.$i.'@admin.com',
            ]);
        }

        User::factory()->create([
            'name' => 'Default User',
            'email' => 'default@admin.com',
        ]);
    }
}
