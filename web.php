<?php

use Illuminate\Support\Facades\Route;

<<<<<<< Updated upstream
=======
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
Route::get('/login', function () {
    return response()->json(['error' => 'Unauthorized'], 401);
})->name('login');

>>>>>>> Stashed changes
Route::get('/', function () {
    return view('welcome');
});
