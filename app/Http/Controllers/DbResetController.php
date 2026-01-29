<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Artisan;

class DbResetController extends Controller
{


    public function index()
    {
        return Inertia::render('adminTools/index');
    }



    public function reset()
    {

        if (! Auth::user()->hasRole('super-admin')) {
            sleep(2);
            return back()->withErrors([
                'reset' => 'You are not authorized to reset the database.',
            ]);

        }


        if (app()->isProduction()) {
            sleep(2);
            return back()->withErrors([
                'reset' => 'Database reset is prohibited in production',
            ]);

        }


        Artisan::call('migrate:fresh', [
            '--seed' => true,
            '--force' => true,
        ]);
        Log::info(Artisan::output());

        sleep(2);

        return back()->with('success', 'Database has been reset and seeded!');



    }




}
