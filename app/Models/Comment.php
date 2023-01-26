<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }

    public static function getByPost($request){

        $sc = Comment::where("post_id", $request->id)->with("user");
        if ($request->order_by && $request->order_by == "time"){
            $sc->order_by("id", "desc");
        }
        $comments = $sc->paginate(10, ['*'], '', $request->page);

        return $comments;
    }
}
