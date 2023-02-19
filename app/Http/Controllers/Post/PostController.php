<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class PostController extends Controller
{

    public function post(Request $request){

        User::isViewer($request->user_id);

        $post = new Post();

        $images = $post->readFile($request);

        //Read post data create
        $post->user_id =$request->user_id;
        $post->content = [
            "content" => $request->content,
            "images" => $images
        ];
        $post->title = "";
        $post->status = 1;

        if (!$post->save()){
            return back()->with("message", "Can save post");
        }

        return back();
    }


    public function postLike(Request $request){

        $post = Post::where("id", $request->id)->first();
        if (!$post){
            return back()->with("code", 0)->with("message", "INVALID DATA");
        }

        $like = Like::where("post_id", $post->id)->where("user_id", Auth::user()->id)->first();
        if (!$like){
            $like = new Like();
        }
        $like->user_id = Auth::user()->id;
        $like->post_id = $post->id;
        $like->comment_id = -1;
        $like->type = $request->type;

        $like->save();

        return back();
    }


    public function getComment(Request $request){

        $comments = Comment::getByPost($request);

        return response()->json([
            "message" => "SUCCESS",
            "comments" => $comments
        ]);
    }
}
