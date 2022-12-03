<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProfileController extends Controller
{
    //
    public function user($id) {

       $user = User::find($id);

       return Inertia::render('Profile', [
            'user' => $user,
       ]);
    }
}
