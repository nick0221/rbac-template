<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PermissionController;

Route::get('/', function () {
    // return Inertia::render('welcome', [
    //     'canRegister' => Features::enabled(Features::registration()),
    // ]);

     return redirect()->route(Auth::check() ? 'dashboard' : 'login');

})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    // Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::resources([
        'users' => UserController::class,
        'roles' => RoleController::class,
        'permissions' => PermissionController::class,
    ]);

    Route::put('permissions/{permission}/assign-roles', [PermissionController::class,'assignRoles',])->name('permissions.assignRoles');
    Route::put('permissions/{permission}/detach-role', [PermissionController::class,'detachRole',])->name('permissions.detachRole');


});

require __DIR__.'/settings.php';
