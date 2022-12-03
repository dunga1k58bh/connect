<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
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

        return Inertia::render('Dashboard', [
            'user' => Auth::user()
        ]);
    }
}
