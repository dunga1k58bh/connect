<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\GroupUse;

class Group extends Model
{
    use HasFactory;

    protected $casts = [
        "data" => "array",
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, "group_users", "group_id", "user_id");
    }


    public function onCreated(){
        $group_user = new GroupUser();
        $group_user->group_id = $this->id;
        $group_user->user_id = Auth::user()->id;
        $group_user->role = GroupUser::ADMIN;

        $group_user->save();
    }

    protected function coverPhoto():Attribute
    {
        return Attribute::make(
            get: fn ($value) => "/images/group/cover/".$value,
        );
    }
}
