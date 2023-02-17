<?php

use Illuminate\Foundation\Application;
use App\Http\Controllers\Home\HomeController;
use App\Http\Controllers\Profile\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'home'])
    ->name('');

Route::get('/dashboard', [HomeController::class, 'home'])
->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/profile/{id}', [ProfileController::class, 'user'])
->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
// require __DIR__.'/user.php';
