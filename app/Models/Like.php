<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    /**
     * Get the user has do this action
     */
    public function user()
    {
        $this->belongsTo(User::class);
    }
}
