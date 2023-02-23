<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class HomeController extends Controller
{
    //

    public function home() {

        if (!Auth::check()) {
            return redirect(route('login'));
        }

        $posts = Post::loadViewerPost();

        return Inertia::render('Dashboard', [
            'user' => Auth::user(),
            'posts' => $posts,
            'canPost' => true,
        ]);
    }
}
