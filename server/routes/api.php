<?php

use Illuminate\Http\Request;

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
Auth::routes();
//Route::post('login', [ 'as' => 'login', 'uses' => 'LoginController@do']);
//Route::post('register', 'API\UserController@register');

Route::group(['middleware'=>['auth:api']], function () {
    Route::resource('/users','Api\UsersController');
    Route::resource('/room','Api\RoomController');
    
    Route::prefix('reservations')->group( function() {
        Route::get('/')->name('reservation.index')->uses('Api\ReservationController@index');
        Route::get('/{id}')->name('reservation.show')->uses('Api\ReservationController@show');
        Route::get('/mades/{date}')->name('reservation.mades')->uses('Api\ReservationController@mades');
        Route::post('/')->name('reservation.reservation')->uses('Api\ReservationController@make');
        //Route::delete('/')->name('reservation.reservation')->uses('Api\ReservationController@destroy');
    });
    
});
