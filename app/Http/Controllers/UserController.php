<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Log\Logger;
use Illuminate\Support\Arr;

use Illuminate\Http\Request;
use function Illuminate\Log\log;
use function Symfony\Component\String\b;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{

    // index
    public function index(Request $request): Response | RedirectResponse
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

            return Inertia::render('users/index', [
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


    // show
    public function show(string $id)
    {
        abort(404);
    }

    // edit
    public function edit(string $id)
    {
        abort(404);
    }

    // update
    public function update(UpdateUserRequest $request, User $user)
    {
        // validate request
        $request->validated();

        try {

            // update user
            $user->update($request->validated());

            // Assign role via Spatie
            if (! empty($request->role_id)) {
                $role = Role::find($request->role_id);

                if ($role) {
                    $user->syncRoles([$role->name]);
                }
            }

            // redirect to users index page
            return back()->with('success', 'User has been successfully updated.');

        } catch (\Throwable $e) {
            // log error message
            User::logError($e, $request->all(), 'update');

            // redirect to users index page
            return back()->with('error', 'Failed to update user. Please try again.');
        }

    }


    // destroy
    public function destroy(string $id)
    {
        abort(404);
    }


}
