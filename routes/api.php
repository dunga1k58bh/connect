<?php

use App\Http\Controllers\friends\FriendsController;
use App\Http\Controllers\Groups\GroupController;
use App\Models\Relation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get("/friends/get_unknown_people/{id}",[FriendsController::class, 'get_unknown_people']);
// Route::get("/friends/get_friends/{id}",[FriendsController::class, 'get_friends']);
// Route::get("/friends/get_request_friends/{id}",[FriendsController::class, 'get_request_friends']);
// Route::get("/friends/get_sent_friends/{id}",[FriendsController::class, 'get_sent_friends']);
Route::post("/friends/send_request/{id}/{id_send}",[FriendsController::class, 'send_request']);
Route::post("/friends/accept_request/{id}/{id_send}",[FriendsController::class, 'accept_request']);
Route::post("/friends/delete_request/{id}/{id_send}",[FriendsController::class, 'delete_request']);
Route::post("/friends/delete_friend/{id}/{id_send}",[FriendsController::class, 'delete_friend']);

// Route::get("/group/get_group_of_user/{id}/",[GroupController::class, 'get_group_of_user']);
// Route::get("/group/get_group_suggestions_of_user/{id}/",[GroupController::class, 'get_group_suggestions_of_user']);
Route::post("/group/leave_group/{user_id}/{group_id}/",[GroupController::class, 'leave_group']);
Route::post("/group/make_group/{user_id}",[GroupController::class, 'make_group']);
Route::post("/group/join_group/{user_id}/{group_id}/",[GroupController::class, 'join_group']);