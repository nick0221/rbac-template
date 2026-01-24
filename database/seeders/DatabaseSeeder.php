<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // $users = [];
        // for ($i = 1; $i <= 10000; $i++) {
        //     $users[] = [
        //         'name' => 'User '.$i,
        //         'email' => 'user'.$i.'@admin.com',
        //         'password' => Hash::make('password'), // or use bcrypt('password')
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ];
        // }

        // Bulk insert
        // User::insert($users);

        for ($i=1; $i < 30; $i++) {
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
