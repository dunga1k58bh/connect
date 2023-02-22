<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    public function comments(){
        return $this->hasMany(Comment::class, "parent_id");
    }

    public static function getByPost($request){

        $sc = Comment::where("post_id", $request->id)->with("user");
        $sc->orderBy("id", "desc");
        $comments = $sc->paginate(10, ['*'], '', $request->page);

        return $comments;
    }


    public static function getByComment($request){

        $sc = Comment::where("parent_id", $request->id)->with("user");
        $sc->orderBy("id", "asc");
        $comments = $sc->paginate(10, ['*'], '', $request->page);

        return $comments;
    }

    protected function content():Attribute
    {
        return Attribute::make(
            get: fn ($value) => unserialize($value),
            set: fn ($value) => serialize($value)
        );
    }
}
