<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{

    protected $appends = ['pages'];

    public function getPagesAttribute(): Collection
    {
        return $this->permissions
            ->flatMap->pages
            ->unique('id')
            ->values();
    }

}
