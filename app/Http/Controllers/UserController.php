<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Log\Logger;
use Illuminate\Http\Request;
use function Illuminate\Log\log;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{

    // index
    public function index(Request $request)
    {

        $perPage = $request->input('per_page', 10);
        $search = $request->input('search');

        $users = User::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return inertia('users/index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    // store user
    public function store(Request $request): RedirectResponse
    {
        // validate request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        try {
            // create user record
            User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => $validated['password'],
            ]);

            // redirect to users index page
            return redirect()
                ->route('users.index')
                ->with('success', 'User has been successfully created.');

        } catch (\Throwable $e) {
            // log error message
            User::logError($e, $validated, 'create');

            // redirect to users index page
            return redirect()
                ->route('users.index')
                ->with('error', 'Failed to create user. Please try again.');
        }

    }

}
