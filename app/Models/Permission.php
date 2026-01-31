<?php

namespace App\Models;

use Spatie\Permission\Models\Role;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Permission\Models\Permission as SpatePermission;

class Permission extends SpatePermission
{


    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }


    public function pages(): BelongsToMany
    {
        return $this->belongsToMany(Page::class);
    }


}
