<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Models\Permission;

class Page extends Model
{
    use SoftDeletes;

    protected $table = 'pages';

    protected $fillable = ['name', 'slug'];

    public function permissions(): HasMany
    {
        return $this->hasMany(Permission::class);
    }


    public function scopeAllowedFor($query, $user)
    {
        $allowedPages = [
            'super-admin' => ['users', 'roles', 'permissions', 'pages', 'dashboard'],
            'manager'     => ['users', 'dashboard'],
            'user'        => ['dashboard'],
        ];

        $role = $user->role->name ?? 'user';

        return $query->whereIn('slug', $allowedPages[$role] ?? []);
    }






}
