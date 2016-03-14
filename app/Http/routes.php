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

Route::get('/', 'HomeController@index')->name('index');
Route::get('home', 'HomeController@index')->name('home');

// Authentication
Route::get('auth/login', 'Auth\AuthController@getLogin')->name('login.get');
Route::post('auth/login', 'Auth\AuthController@postLogin')->name('login.post');
Route::get('auth/logout', 'Auth\AuthController@getLogout')->name('logout');

// Reset password
Route::get('profile/changepass', 'StaffController@profile')->name('profile.chpass.get');
Route::put('profile/changepass', 'StaffController@chPass')->name('profile.chpass.post');
Route::post('profile/edit', 'StaffController@update')->name('profile.chpass.post');

// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister')->name('register');
Route::post('auth/register', 'Auth\AuthController@postRegister')->name('register.store');

// Account management
Route::get('staff/', 'StaffController@index')->name('staff.index');
Route::get('staff/create', 'StaffController@create')->name('staff.create');
Route::post('staff/create', 'StaffController@store')->name('staff.store');
Route::get('staff/edit/{id}', 'StaffController@edit')->name('staff.edit');
Route::get('staff/remove/{id}', 'StaffController@destroy')->name('staff.destroy');

// Roles
Route::get('staff/policies', 'StaffController@policies')->name('staff.policies');
Route::get('staff/policies/create', 'StaffController@addpolicies')->name('staff.policies.new');
Route::post('staff/policies/create', 'StaffController@addRole')->name('staff.policies.store');

Route::get('staff/policies/edit/{id}', 'StaffController@editpolicies')->name('staff.policies.edit');
Route::get('staff/policies/remove/{id}', 'StaffController@destroyRole')->name('staff.policies.remove');

// Permissions
Route::get('staff/permissions', 'StaffController@permissions')->name('staff.permissions');
Route::get('staff/permissions/create', 'StaffController@create_permission')->name('staff.permissions.create');
Route::post('staff/permissions/create', 'StaffController@save_permission')->name('staff.permissions.store');

Route::get('staff/permissions/edit/{id}', 'StaffController@edit_permission')->name('staff.permissions.edit');
Route::get('staff/permissions/remove/{id}', 'StaffController@destroy_permission')->name('staff.permissions.remove');

// sick
Route::get('sick', 'SickController@index')->name('sick.index');
Route::get('sick/display/{id}', 'SickController@show')->name('sick.specific');

Route::get('sick/register', 'SickController@create')->name('sick.new');
Route::post('sick/register', 'SickController@store')->name('sick.store');

// Departments
Route::get('staff/departments', 'DepartmentsController@index')->name('staff.departments.index');
Route::get('staff/departments/create', 'DepartmentsController@create')->name('staff.departments.new');
Route::post('staff/departments/docreate', 'DepartmentsController@store')->name('staff.departments.store');

// Teams
Route::get('staff/teams', 'TeamsController@index')->name('staff.teams');
Route::get('staff/teams/create', 'TeamsController@create')->name('staff.teams.new');
Route::post('staff/teams/create', 'TeamsController@store')->name('staff.create.store');
