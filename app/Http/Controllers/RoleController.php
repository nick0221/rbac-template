<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRolesRequest;
use App\Http\Requests\UpdateRoleRequest;
use Inertia\Inertia;
use App\Models\Permission;
use App\Models\Role as ModelsRole;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;


class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $perPage = $request->input('per_page', 10);
        $roleSearch = $request->string('roles_search');
        $permissionSearch = $request->string('permissions_search');

        $roles = Role::query()->with(['permissions.page'])
            ->when($roleSearch, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%") ;
            })
            ->latest()
            ->paginate($perPage, ['*'], 'role_page', 1)
            ->withQueryString();

        $permissions = Permission::query()->with(['page', 'roles'])
            ->when($permissionSearch, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%") ;
            })
            ->latest()
            ->paginate($perPage, ['*'], 'permission_page', 1)
            ->withQueryString();


        return Inertia::render('rolesPermissions/index', [
            'roles' => $roles,
            'permissions' => $permissions,
            'filters' => [
                'roles_search' => $roleSearch,
                'permissions_search' => $permissionSearch,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRolesRequest $request)
    {
        $request->validated();

        Role::create($request->all());

        return back()->with('success', ucfirst($request->name).' Role has been successfully created.');

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, ModelsRole $role)
    {
        $validated = $request->validated();

        // Normalize name (optional, matches our frontend logic)
        $validated['name'] = ucfirst(strtolower($validated['name']));

        $role->update($validated);

        return back()->with(
            'success',
            $role->name . ' role has been successfully updated.'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
