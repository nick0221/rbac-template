<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Clear cached roles & permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
 // -----------------------------
        // Create Pages
        // -----------------------------
        $usersPage = Page::firstOrCreate(['name' => 'Users', 'slug' => 'users']);
        $rolesPage = Page::firstOrCreate(['name' => 'Roles', 'slug' => 'roles']);

        $permissions = [
            // Users page
            ['name' => 'users.view', 'page_id' => $usersPage->id],
            ['name' => 'users.create', 'page_id' => $usersPage->id],
            ['name' => 'users.edit', 'page_id' => $usersPage->id],
            ['name' => 'users.delete', 'page_id' => $usersPage->id],

            // Roles page
            ['name' => 'roles.view', 'page_id' => $rolesPage->id],
            ['name' => 'roles.create', 'page_id' => $rolesPage->id],
            ['name' => 'roles.edit', 'page_id' => $rolesPage->id],
            ['name' => 'roles.delete', 'page_id' => $rolesPage->id],


        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm['name']], ['page_id' => $perm['page_id']]);
        }


         // -----------------------------
        // Create Roles
        // -----------------------------
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin']);
        $manager = Role::firstOrCreate(['name' => 'manager']);
        $user = Role::firstOrCreate(['name' => 'user']);


        // -----------------------------
        // Sync Permissions
        // -----------------------------
        $superAdmin->syncPermissions(Permission::all());
        $manager->syncPermissions(Permission::whereIn('name', [
            'users.view', 'users.create', 'users.edit',
        ])->get());
        $user->syncPermissions(Permission::whereIn('name', [
            'users.view',
        ])->get());






    }
}
