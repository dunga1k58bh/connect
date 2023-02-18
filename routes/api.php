<?php

use App\Http\Controllers\friends\friends;
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

Route::get("/friends/get_unknown_people/{id}",[friends::class, 'get_unknown_people']);
Route::get("/friends/get_friends/{id}",[friends::class, 'get_friends']);
Route::get("/friends/get_request_friends/{id}",[friends::class, 'get_request_friends']);
Route::get("/friends/get_sent_friends/{id}",[friends::class, 'get_sent_friends']);
Route::post("/friends/send_request/{id}/{id_send}",[friends::class, 'send_request']);
Route::post("/friends/accept_request/{id}/{id_send}",[friends::class, 'accept_request']);
Route::post("/friends/delete_request/{id}/{id_send}",[friends::class, 'delete_request']);