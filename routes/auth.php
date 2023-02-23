<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Comment\CommentController;
use App\Http\Controllers\Groups\GroupController;
use App\Http\Controllers\Post\PostController;
use App\Http\Controllers\Profile\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
                ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
                ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
                ->name('password.update');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', [EmailVerificationPromptController::class, '__invoke'])
                ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
                ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});


Route::middleware('auth')->group(function () {
    Route::post('profile/{id}/edit-coverimage', [ProfileController::class, 'changeCoverPhoto'])
    ->name("edit.coverphoto");

    Route::post('profile/{id}/edit-avatar', [ProfileController::class, 'changeAvatar'])
    ->name("edit.avatar");

    Route::get('profile/{id}', [ProfileController::class, 'user'])
    ->name("get.profile");

    Route::post('post', [PostController::class, 'post'])
    ->name("post");

    Route::post('post/{id}/like-post', [PostController::class, 'postLike'])
    ->name("like.post");

    Route::post('post/{id}/toggle-like-post', [PostController::class, 'togglePostLike'])
    ->name("toggle.like.post");

    Route::post("post/{id}/get-comments", [PostController::class, 'getComments'])
    ->name("get-post-comments");

    Route::post("comment/{id}/get-responses", [CommentController::class, 'getResponseComments'])
    ->name("get-response-comments");

    Route::post('comment', [CommentController::class, 'comment'])
    ->name("comment");

    Route::post('comment/{id}/like', [CommentController::class, 'commentLike'])
    ->name("like.comment");

    Route::post('comment/{id}/toggle-like', [CommentController::class, 'toggleCommentLike'])
    ->name("toggle.like.comment");

    Route::get('groups/feed', [GroupController::class, 'groupFeed'])
    ->name("group.feed");

    Route::post('group/-/create', [GroupController::class, 'createGroup'])
    ->name("group.create");

    Route::get('groups/{id}', [GroupController::class, 'group'])
    ->name("group");
});
