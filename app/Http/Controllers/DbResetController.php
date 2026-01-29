<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Artisan;

class DbResetController extends Controller
{
    public function reset()
    {
        $checkAdmin = Auth::user()->role()->name;

        if ($checkAdmin !== 'super-admin') {
            abort(403, 'Unauthorized');
        }
        dd($checkAdmin);
        // Optional: extra check with a secret key
        // if (request()->get('key') !== env('DB_RESET_KEY')) {
        //     abort(403, 'Unauthorized');
        // }

        Artisan::call('migrate:fresh', [
            '--seed' => true,
            '--force' => true,
        ]);

        // return response()->json([
        //     'status' => 'success',
        //     'message' => 'Database has been reset and seeded!'
        // ]);
        return back()->with('success', 'Database has been reset and seeded!');
    }
}
