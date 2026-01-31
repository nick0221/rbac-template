<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Collection;
use Spatie\Permission\Models\Role as SpatieRole;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends SpatieRole
{

    protected $appends = ['display_name'];

    protected $hidden = [
        'pivot',
        'updated_at',
    ];

    public function getDisplayNameAttribute(): string
    {
        return Str::title(str_replace('-', ' ', $this->name));
    }


    // upon saving, normalize the role name
    protected static function booted(): void
    {
        static::saving(function ($role) {
            $role->name = Str::slug($role->name);
        });
    }



}
