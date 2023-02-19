<?php

namespace App\Http\Controllers\Comment;

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

class CommentController extends Controller
{
    public function getPostComment($request){

    }


    public function comment(Request $request){

        User::isViewer($request->user_id);

        $comment = new Comment();

        $comment->user_id =$request->user_id;
        $comment->content = $request->content;
        $comment->post_id = $request->post_id;
        $comment->parent_id = $request->comment_id;

        $comment->status = 1;

        if (!$comment->save()){
            return back()->with("message", "Can save post");
        }

        return back();
    }
}
