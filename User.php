<?php

namespace App\Models;

<<<<<<< Updated upstream
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
=======
>>>>>>> Stashed changes
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
<<<<<<< Updated upstream
    use HasFactory, Notifiable;
=======
    use HasApiTokens, Notifiable;
>>>>>>> Stashed changes

    protected $fillable = [
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

<<<<<<< Updated upstream
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
        ];
    }
=======
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
>>>>>>> Stashed changes
}
