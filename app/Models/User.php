<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Attributes\SearchUsingFullText;
use Laravel\Scout\Attributes\SearchUsingPrefix;
use Laravel\Scout\Searchable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name',
        'first_name',
        'last_name',
        'email',
        'phone',
        'role',
        'birth_date',
        'gender',
        'avatar',
        'cover_photo',
        'profile_link',
        'data',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected function coverPhoto():Attribute
    {
        return Attribute::make(
            get: fn ($value) => "/images/".$value,
        );
    }


    protected function avatar():Attribute
    {
        return Attribute::make(
            get: fn ($value) => "/images/".$value,
        );
    }


    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    #[SearchUsingPrefix(['id', 'email'])]
    #[SearchUsingFullText(['bio'])]
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'full_name' => $this->name,
            'email' => $this->email,
        ];
    }

    /**
     * Get all users has relation with this user
     */
    public function relations()
    {
        return $this->belongsToMany(User::class, "relations", "user_id1", "user_id2")->withTimestamps();;
    }
}
