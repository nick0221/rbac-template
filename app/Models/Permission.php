<?php

namespace App\Models;

use Spatie\Permission\Models\Role;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Spatie\Permission\Models\Permission as SpatePermission;

class Permission extends SpatePermission
{

    //
    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }



}
