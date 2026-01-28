<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
       abort(404);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        abort(404);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermissionRequest $request)
    {
        $request->validated();

        Permission::create($request->all());

        return back()->with('success', ucfirst($request->name).' Permission has been successfully created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        abort(404);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        abort(404);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        $validated = $request->validated();
        $permission->update($validated);


        return back()->with(
            'success',
            $permission->name . ' permission has been successfully updated.'
        );

    }


    // Assign roles
    public function assignRoles(Request $request, Permission $permission)
    {
        $permission->roles()->syncWithoutDetaching($request->roles);
        return back()->with('success', 'Selected role successfully assigned.');

    }

    // Detach roles
    public function detachRole(Request $request, Permission $permission)
    {
        $roleId = $request->input('role_id');
        $permission->roles()->detach($roleId);

        $roleName = Role::find($roleId)->name;

        return back()->with('success', $roleName.' role has been successfully detached from '.$permission->name);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
