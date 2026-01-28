<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Log\Logger;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;

use function Illuminate\Log\log;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\StoreUserRequest;

class UserController extends Controller
{

    // index
    public function index(Request $request)
    {
        try {

            $perPage = $request->input('per_page', 10);
            $search = $request->input('users_search');

            $users = User::query()->with('roles:id,name')
                ->when($search, function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
                ->latest()
                ->paginate($perPage)
                ->withQueryString();


            $allRoles = Role::get(['id', 'name']);

            return inertia('users/index', [
                'users' => $users,
                'allRoles' => $allRoles,
                'filters' => [
                    'users_search' => $search,
                ],
            ]);


        } catch (\Throwable $e) {

            User::logError($e, $request->all(), 'index');

            return Inertia::render('users/index', [
                'users' => User::noRecordsFoundTable(),
                'filters' => [
                    'search' => '',
                ],

            ])
            ->with('generalError', 'Failed to fetch users, please try again.')
            ->toResponse($request)
            ->setStatusCode(500);
        }


    }

    // store user
    public function store(StoreUserRequest $request): RedirectResponse
    {
        // validate request
        $validated = $request->validated();


        try {
           // Create user WITHOUT role_id logic
            $user = User::create(Arr::except($validated, ['role_id']));

            // Assign role via Spatie
            if (! empty($validated['role_id'])) {
                $role = Role::find($validated['role_id']);

                if ($role) {
                    $user->syncRoles([$role->name]);
                }
            }

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
