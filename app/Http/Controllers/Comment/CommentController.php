<?php

namespace App\Http\Controllers\Comment;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Like;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function getResponseComments(Request $request){

        $comments = Comment::getByComment($request);

        return response()->json([
            "message" => "SUCCESS",
            "comments" => $comments
        ]);
    }


    public function comment(Request $request){

        User::isViewer($request->user_id);

        $comment = new Comment();

        $comment->user_id =$request->user_id;
        $comment->content = $request->content;
        $comment->post_id = $request->post_id;
        $comment->parent_id = $request->comment_id;

        if ($comment->parent_id){
            $parent_comment = Comment::where("id", $request->comment_id)->first();
            $parent_comment->increase("responses");
            $parent_comment->save();
        }

        $comment->status = 1;

        if (!$comment->save()){
            return back()->with("message", "Can save post");
        }

        return back();
    }


    public function commentLike(Request $request){

        $comment = Comment::where("id", $request->id)->first();
        if (!$comment){
            return back()->with("code", 0)->with("message", "INVALID DATA");
        }

        $like = Like::where("comment_id", $comment->id)->where("user_id", Auth::user()->id)->first();
        if (!$like){
            $like = new Like();
            $new = true;
        }
        $like->user_id = Auth::user()->id;
        $like->post_id = -1;
        $like->comment_id = $comment->id;
        $like->type = $request->type;

        $like->save();

        return response()->json([
            "like" => $like,
        ]);
    }


    public function toggleCommentLike(Request $request){

        $comment = Comment::where("id", $request->id)->first();
        if (!$comment){
            return back()->with("code", 0)->with("message", "INVALID DATA");
        }

        $like = Like::where("comment_id", $comment->id)->where("user_id", Auth::user()->id)->first();

        if (!$like){
            $like = new Like();
            $like->type = "like";
        } else {
            if ($like->type == "nolike"){
                $like->type = "like";
            } else {
                $like->type = "nolike";
            }
        }

        $like->user_id = Auth::user()->id;
        $like->post_id = -1;
        $like->comment_id = $comment->id;

        $like->save();

        return response()->json([
            "like" => $like,
        ]);
    }
}
