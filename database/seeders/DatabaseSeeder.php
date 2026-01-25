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

        // include the RolesSeeder  for seeding data
        $this->call([
            RoleSeeder::class
        ]);

        //  Create Default User
        User::factory()->create([
            'name' => 'Default User',
            'email' => 'default@admin.com',
        ]);


        // Create 30 Users
        for ($i=1; $i < 30; $i++) {
            User::factory()->create([
               'name' => 'User '.$i,
                'email' => 'user'.$i.'@admin.com',
            ]);
        }


    }
}
