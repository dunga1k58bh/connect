<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Comment extends Model
{
    use HasFactory;

    protected $casts = [
        'data' => 'array',
    ];

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
        $comments = $sc->paginate(5, ['*'], '', $request->page);

        foreach ($comments as $comment){
            $my_reaction = Like::where("comment_id", $comment->id)->where("user_id", Auth::user()->id)->first();
            if ($my_reaction){
                $comment->my_reaction = $my_reaction;
            }
        }

        return $comments;
    }


    public static function getByComment($request){

        $sc = Comment::where("parent_id", $request->id)->with("user");
        $sc->orderBy("id", "asc");
        $comments = $sc->paginate(5, ['*'], '', $request->page);

        foreach ($comments as $comment){
            $my_reaction = Like::where("comment_id", $comment->id)->where("user_id", Auth::user()->id)->first();
            if ($my_reaction){
                $comment->my_reaction = $my_reaction;
            }
        }

        return $comments;
    }

    protected function content():Attribute
    {
        return Attribute::make(
            get: fn ($value) => unserialize($value),
            set: fn ($value) => serialize($value)
        );
    }


    public function increase($key){

        if (!$this->data){
            $this->data = [];
        }
        $data = $this->data;
        $data[$key] = array_key_exists($key, $data) ? $data[$key] + 1 : 1;

        $this->data = $data;
    }

    public function decrease($key){

        if (!$this->data){
            $this->data = [];
        }
        $data = $this->data;
        $data[$key] = (array_key_exists($key, $data) && $data[$key] > 0) ? $data[$key] - 1 : 0;

        $this->data = $data;
    }
}
