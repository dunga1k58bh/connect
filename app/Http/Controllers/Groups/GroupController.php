<?php

namespace App\Http\Controllers\Groups;

use Exception;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Group;
use App\Models\GroupUser;
use App\Http\Controllers\Controller;
use App\Models\Post;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GroupController extends Controller
{

    public function groupFeed(){

        $list_group =GroupUser::All()->where("user_id", Auth::user()->id);

        $res = [];
        foreach ($list_group as $i) {
            $group = Group::all()->where("id", $i->group_id)->first();
            array_push($res, [
                'id' => $group->id,
                'name' => $group->name,
                'avt' => $group->avatar,
                'cover_img' => $group->cover_photo,
                'created_at' => $i->created_at,
            ]);
        }

        return Inertia::render('Group/GroupFeed', [
            'user' => Auth::user(),
            'groups' => $res,
            'canPost'=> false
        ]);
    }


    public function groupSuggestion(){

        $groups = Group::all();

        return Inertia::render('Group/GroupSuggesstion', [
            'user' => Auth::user(),
            'groups' => $groups,
            'canPost'=> false
        ]);
    }


    public function group(Request $request){

        $group = Group::find($request->id);

        $posts = Post::loadByGroup($group);

        return Inertia::render('Group/Group', [
            "group" => $group,
            "posts" => $posts,
            "canPost" => true,
        ]);
    }


    public function createGroup(Request $request){

        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|integer'
        ]);

        $group = new Group();

        $group->name = $request->name;
        $group->type = $request->type;
        $group->data = [
            "members" => 1
        ];
        $group->save();

        $group->onCreated();

        return redirect()->route("group", ["id" => $group->id]);
    }


    public function editCoverPhoto(Request $request){

        $group = Group::find($request->id);
        if (Auth::user()->isAdmin($group)){

        }

        $extention = $request->file->extension();
        $file_name = time().'.'.$extention;

        $request->file->move(public_path('images/group/cover'), $file_name);

        $group->cover_photo = $file_name;
        $group->save();

        return back()->with('status', 200)
                    ->with('image', $file_name);
    }


    public function get_group_of_user($id)
    {
        try {
            if (!User::find($id))
                return response()->json(
                    [
                        'code' => '404',
                        'message' => 'Not found user'
                    ]
                );

            $list_group = GroupUser::All()->where("user_id", $id);

            $res = [];
            foreach ($list_group as $i) {
                $group = Group::all()->where("id", $i->group_id)->first();
                array_push($res, [
                    'id' => $group->id,
                    'name' => $group->name,
                    'avt' => $group->avatar,
                    'cover_img' => $group->cover_photo,
                    'created_at' => $i->created_at,
                ]);
            }

            return Inertia::render('Groups', [
                'list_group' => $res,
            ]);

            // return response()->json(
            //     [
            //         'code' => '200',
            //         'list_group' => $res
            //     ]
            // );
        } catch (Exception $error) {
            return response()->json(
                [
                    'code' => '500',
                    'message' => 'Failed to get group!!!'
                ]
            );
        }
    }

    public function get_group_suggestions_of_user($id)
    {
        try {
            if (!User::find($id))
                return response()->json(
                    [
                        'code' => '404',
                        'message' => 'Not found user'
                    ]
                );

            $list_group = GroupUser::All()->where("user_id", $id);

            $res = [];
            $list_group_id = [];
            foreach ($list_group as $i) {
                array_push($list_group_id,  $i->group_id);
            }

            $list_group_suggest = GroupUser::All()->whereNotIn("group_id", $list_group_id);

            foreach ($list_group_suggest as $i) {
                $group = Group::all()->where("id", $i->group_id)->first();
                array_push($res, [
                    'id' => $group->id,
                    'name' => $group->name,
                    'avt' => $group->avatar,
                    'cover_img' => $group->cover_photo,
                    'created_at' => $i->created_at,
                ]);
            }


            return Inertia::render('GroupsSuggest', [
                'list_group_suggest' => $res,
            ]);

            // return response()->json(
            //     [
            //         'code' => '200',
            //         'list_group' => $res
            //     ]
            // );
        } catch (Exception $error) {
            return response()->json(
                [
                    'code' => '500',
                    'message' => 'Failed to get group!!!'
                ]
            );
        }
    }

    public function leave_group($user_id, $group_id)
    {
        try {
            if (!User::find($user_id) || !Group::find($group_id))
                return response()->json(
                    [
                        'code' => '404',
                        'message' => 'Not found user'
                    ]
                );

            if (GroupUser::All()->where("user_id", $user_id)->where("group_id", $group_id)->toArray() != null) {
                DB::table("group_users")->where("user_id", $user_id)->where("group_id", $group_id)->delete();
                return response()->json(
                    [
                        'code' => '200',
                        'message' => "OK"
                    ]
                );
            } else {
                return response()->json(
                    [
                        'code' => '400',
                        'message' => 'Bad Request'
                    ]
                );
            }
        } catch (Exception $error) {
            return response()->json(
                [
                    'code' => '500',
                    'message' => 'Failed to accept leave group!!!'
                ]
            );
        }
    }

    public function make_group($user_id, Request $request)
    {
        try {
            $name_group = $request->name_group;
            if (!User::find($user_id))
                return response()->json(
                    [
                        'code' => '404',
                        'message' => 'Not found user'
                    ]
                );


            $date = new DateTime();
            $result = $date->format('Y-m-d H:i:s');

            DB::table('groups')->insert(
                [
                    "name" => $name_group,
                    "created_at" => $result,
                    "updated_at" => $result,
                ],
            );
            DB::table('group_users')->insert(
                [
                    "user_id" => $user_id,
                    "group_id" => Group::orderBy('id', 'DESC')->get()[0]["id"],
                    "role" => 0,
                    "status" => 1,
                    "created_at" => $result,
                    "updated_at" => $result,
                ],
            );
            return response()->json(
                [
                    'code' => '200',
                    'message' => 'Succesful to accept make group!!!'
                ]
            );
        } catch (Exception $error) {
            return response()->json(
                [
                    'code' => '500',
                    'message' => 'Failed to accept make group!!!'
                ]
            );
        }
    }

    public function join_group($user_id, $group_id)
    {
        try {
            if (!User::find($user_id) || !Group::find($group_id))
                return response()->json(
                    [
                        'code' => '404',
                        'message' => 'Not found user'
                    ]
                );


            $date = new DateTime();
            $result = $date->format('Y-m-d H:i:s');

            DB::table('group_users')->insert(
                [
                    "user_id" => $user_id,
                    "group_id" => Group::find($group_id)["id"],
                    "role" => 1,
                    "status" => 1,
                    "created_at" => $result,
                    "updated_at" => $result,
                ],
            );
            return response()->json(
                [
                    'code' => '200',
                    'message' => 'Succesful to accept leave group!!!'
                ]
            );
        } catch (Exception $error) {
            return response()->json(
                [
                    'code' => '500',
                    'message' => 'Failed to accept leave group!!!'
                ]
            );
        }
    }
}
