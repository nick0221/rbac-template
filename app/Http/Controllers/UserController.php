<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'password_confirmation' => 'required|same:password',
        ]);


        User::create([
            'name' =>  $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return redirect()->route('users.index')->with('success', 'User has been successfully created.');
    }

}
