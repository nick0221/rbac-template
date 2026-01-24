<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
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

}
