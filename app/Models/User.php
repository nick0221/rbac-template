<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Throwable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'role_id' => 'integer'
        ];
    }

    // @phpstan-ignore-next-line
    public static function logError(
        Throwable $e,
        array $payload = [],
        string $actionType = 'action'
    ): void {
        $user = Auth::user();

        Log::channel('pretty')->error("User {$actionType} failed", [
            'exception' => [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ],
            'auth' => [
                'id' => $user?->id,
                'name' => $user?->name,
                'email' => $user?->email,
            ],
            'payload' => $payload,
        ]);
    }


    public static function noRecordsFoundTable(): array
    {
        $tableProps = [
            'data' => [],
            'total' => 0,
            'current_page' => 1,
            'per_page' => 10,
            'last_page' => 1,
            'from' => 1,
            'to' => 0,
            'path' => '',
            'link' => [],
            'first_page_url' => '',
            'next_page_url' => '',
            'last_page_url' => '',
            'prev_page_url' => '',
            'first_page' => 1,
            'last_page' => 1,

        ];

        return $tableProps;
    }
}
