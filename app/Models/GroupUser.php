<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupUser extends Model
{
    const ADMIN = 13;
    const MEMBER = 0;

    use HasFactory;

    protected $attributes = [
        'status' => 1,
    ];
}
