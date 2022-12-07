<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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

    /**
     * Change cover profile photo
     * @param Illuminate\Http\Request $request
     * @return Illuminate\Http\Request $response
     */
    public function changeCoverPhoto(Request $request, $id) {

        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $extention = $request->file->extension();
        $file_name = time().'.'.$extention;

        $user = User::find($id);

        if (!$user->is(Auth::user())) {
            return new Response([
                'code' => 0,
                'message' => "INVALID USER"
            ]);
        }

        $request->file->move(public_path('images'), $file_name);

        $user->cover_photo = $file_name;
        $user->save();

        return back()->with('status', 200)
                    ->with('image', $file_name);
    }
}
