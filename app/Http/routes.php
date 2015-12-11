<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');
Route::get('home', 'HomeController@index');

Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

Route::get('profile/changepass', 'StaffController@profile');
Route::put('profile/changepass', 'StaffController@profile');

// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');

// Account management
Route::get('staff/', 'StaffController@index');
Route::get('staff/create', 'StaffController@create');
Route::post('staff/create', 'StaffController@store');
Route::get('staff/edit/{id}', 'StaffController@edit');

// Roles & Permissions
Route::get('staff/permissions', 'StaffController@permissions');
Route::get('staff/permissions/create', 'StaffController@create_permission');
Route::post('staff/permissions/create', 'StaffController@save_permission');

Route::get('staff/policies', 'StaffController@policies');
Route::get('staff/policies/create', 'StaffController@addpolicies');
Route::post('staff/policies/create', 'StaffController@addRole');

Route::get('staff/policies/edit/{id}', 'StaffController@editpolicies');
Route::get('staff/policies/remove/{id}', 'StaffController@destroyRole');


// Departments
Route::get('staff/departments', 'DepartmentsController@index');
Route::get('staff/departments/create', 'DepartmentsController@create');
Route::post('staff/departments/docreate', 'DepartmentsController@store');



Route::get('staff/remove/{id}', 'StaffController@destroy');

Route::get('staff/departments', 'DepartmentsController@index');
Route::get('staff/departments/create', 'DepartmentsController@create');
Route::post('staff/departments/create', 'DepartmentsController@create');

