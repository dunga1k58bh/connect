<?php

namespace App\Http\Controllers\friends;

use Exception;
use Illuminate\Support\Facades\DB;
use OpenApi\Attributes\Response;


use App\Models\Relation;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Cast\Array_;

use function PHPUnit\Framework\returnSelf;

class friends extends Controller
{
    //
    public function get_unknown_people($id)
    {
        try {
            if (!User::find($id))
                return response()->json(
                    [
                        'code' => '404',
                        'message' => 'Not found user'
                    ]
                );

            $requset_friends = DB::table('relations')->where("user_id1", $id)->where("status", UNKNOWN_PEOPLE)->get();
            $res = [];
            foreach ($requset_friends as $i) {
                $user = User::find($i->user_id2);
                array_push($res, [
                    'id' => $user->id,
                    'name' => $user->full_name,
                    'avt' => $user->avater,
                    'created_at' => $i->created_at,
                ]);
            }

            return response()->json(
                [
                    'code' => '200',
                    'unknown_people' => $res
                ]
            );
        } catch (Exception $error) {
            return response()->json(
                [
                    'code' => '500',
                    'message' => 'Failed to get unknown people!!!'
                ]
            );
        }
    }

    public function get_friends($id)
    {
        try {
            if (!User::find($id))
                return response()->json(
                    [
                        'code' => '404',
                        'message' => 'Not found user'
                    ]
                );

            $requset_friends = DB::table('relations')->where("user_id1", $id)->where("status", FRIEND)->get();
            $res = [];
            foreach ($requset_friends as $i) {
                $user = User::find($i->user_id2);
                array_push($res, [
                    'id' => $user->id,
                    'name' => $user->full_name,
                    'avt' => $user->avater,
                    'created_at' => $i->created_at,
                ]);
            }

            return response()->json(
                [
                    'code' => '200',
                    'friends' => $res
                ]
            );
        } catch (Exception $error) {
            return response()->json(
                [
                    'code' => '500',
                    'message' => 'Failed to get friend!!!'
                ]
            );
        }
    }


    public function get_request_friends($id)
    {
        try {
            if (!User::find($id))
                return response()->json(
                    [
                        'code' => '404',
                        'message' => 'Not found user'
                    ]
                );

            $requset_friends = DB::table('relations')->where("user_id1", $id)->where("status", RECEIVER)->get();
            $res = [];
            foreach ($requset_friends as $i) {
                $user = User::find($i->user_id2);
                array_push($res, [
                    'id' => $user->id,
                    'name' => $user->full_name,
                    'avt' => $user->avater,
                    'created_at' => $i->created_at,
                ]);
            }

            return response()->json(
                [
                    'code' => '200',
                    'request_friends' => $res
                ]
            );
        } catch (Exception $error) {
            return response()->json(
                [
                    'code' => '500',
                    'message' => 'Failed to get request friend!!!'
                ]
            );
        }
    }

    public function get_sent_friends($id)
    {
        try {
            if (!User::find($id))
                return response()->json(
                    [
                        'code' => '404',
                        'message' => 'Not found user'
                    ]
                );

            $requset_friends = DB::table('relations')->where("user_id1", $id)->where("status", SENDER)->get();
            $res = [];
            foreach ($requset_friends as $i) {
                $user = User::find($i->user_id2);
                array_push($res, [
                    'id' => $user->id,
                    'name' => $user->full_name,
                    'avt' => $user->avater,
                    'created_at' => $i->created_at,
                ]);
            }

            return response()->json(
                [
                    'code' => '200',
                    'sent_friends' => $res
                ]
            );
        } catch (Exception $error) {
            return response()->json(
                [
                    'code' => '500',
                    'message' => 'Failed to get sent friend!!!'
                ]
            );
        }
    }

    public function send_request($id, $id_send)
    {
        try {
            if (!User::find($id) || !User::find($id_send))
                return response()->json(
                    [
                        'code' => '404',
                        'message' => 'Not found user'
                    ]
                );
            if (DB::table('relations')->where("user_id1", $id)->where("user_id2", $id_send)->where("status", UNKNOWN_PEOPLE)->get()->toArray() != null) {

                Relation::where("user_id1", $id)->where("user_id2", $id_send)->update(
                    [
                        "status" => SENDER
                    ]
                );

                Relation::where("user_id1", $id_send)->where("user_id2", $id)->update(
                    [
                        "status" => RECEIVER
                    ]
                );
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
                    'message' => 'Failed to accept request friend!!!'
                ]
            );
        }
    }

    public function accept_request($id, $id_send)
    {
        try {
            if (!User::find($id) || !User::find($id_send))
                return response()->json(
                    [
                        'code' => '404',
                        'message' => 'Not found user'
                    ]
                );

            if (DB::table('relations')->where("user_id1", $id)->where("user_id2", $id_send)->where("status", RECEIVER)->get()->toArray() != null) {

                Relation::where("user_id1", $id_send)->where("user_id2", $id)->update(
                    [
                        "status" => FRIEND
                    ]
                );

                Relation::where("user_id1", $id)->where("user_id2", $id_send)->update(
                    [
                        "status" => FRIEND
                    ]
                );
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
                    'message' => 'Failed to accept request friend!!!'
                ]
            );
        }
    }

    public function delete_request($id, $id_send)
    {
        try {
            if (!User::find($id) || !User::find($id_send))
                return response()->json(
                    [
                        'code' => '404',
                        'message' => 'Not found user'
                    ]
                );

            if (DB::table('relations')->where("user_id1", $id)->where("user_id2", $id_send)->where("status", RECEIVER)->get()->toArray() != null) {

                Relation::where("user_id1", $id_send)->where("user_id2", $id)->update(
                    [
                        "status" => UNKNOWN_PEOPLE
                    ]
                );

                Relation::where("user_id1", $id)->where("user_id2", $id_send)->update(
                    [
                        "status" => UNKNOWN_PEOPLE
                    ]
                );
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
                    'message' => 'Failed to delete request friend!!!'
                ]
            );
        }
    }
}
