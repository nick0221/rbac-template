<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $per_page = $request->input('per_page', 10);

        $query = User::query();

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->input('search') . '%');
        }

        $users = $query->latest()->paginate($per_page)->withQueryString();



        return inertia('users/index', [
            'users' => $users,
        ]);
    }

}
