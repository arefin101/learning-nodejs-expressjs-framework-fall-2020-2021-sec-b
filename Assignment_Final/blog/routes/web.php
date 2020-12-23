<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', 'loginController@index')->name('login');
Route::post('/login', 'loginController@verify');
// Route::get('/logout', 'logoutController@logout');

Route::get('/home', 'homeController@home')->name('home');
Route::get('/create', 'homeController@create')->name('create');
Route::post('/create', 'homeController@store')->name('store');
Route::get('/stdlist', 'homeController@stdlist')->name('stdlist');
Route::get('/edit/{userName}', 'homeController@edit')->name('edit');
Route::post('/edit/{userName}', 'homeController@edited')->name('edited');
