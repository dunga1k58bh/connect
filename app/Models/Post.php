<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'group_id',
        'status',
        'title',
        'tag',
        'content',
        'since'
    ];


    public function users()
    {
        return $this->belongsTo(User::class, 'id');
    }

    protected function content():Attribute
    {
        return Attribute::make(
            get: fn ($value) => unserialize($value),
            set: fn($value) => serialize($value)
        );
    }

    /**Get all the comments in this post */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }


    public function likes()
    {
        return $this->hasMany('');
    }


    public function readFile($request){

        $files = [];
        if($request->images)
		{
			foreach($request->images as $file)
			{
			    $name = time().rand(1,100).'.'.$file["file"]->extension();
			    $file["file"]->move(public_path('images/posts'), $name);
			    $files[] = $name;
			}
		}

        return $files;
    }


    public static function loadViewerPost(){
        $posts = Post::orderBy('id', 'desc')->with("users")->paginate(10);

        foreach ($posts as $post){
            $my_reaction = Like::where("post_id", $post->id)->where("user_id", Auth::user()->id)->first();
            if ($my_reaction){
                $post->my_reaction = $my_reaction;
            }
        }

        return $posts;
    }
}
