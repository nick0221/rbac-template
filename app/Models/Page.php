<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Permission\Models\Permission;

class Page extends Model
{
    protected $table = 'pages';

    protected $fillable = ['name', 'slug'];

    public function permissions(): HasMany
    {
        return $this->hasMany(Permission::class);
    }
}
