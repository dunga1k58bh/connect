<?php

namespace App\Http\Controllers\Groups;

use Exception;
use Illuminate\Support\Facades\DB;
use OpenApi\Attributes\Response;


use App\Models\Relation;
use App\Models\User;
use App\Models\Group;
use App\Models\GroupUser;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;


class GroupController extends Controller
{
    //
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

            $list_group =GroupUser::All()->where("group_id", $id);
                
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

}