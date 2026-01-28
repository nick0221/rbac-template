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
}
