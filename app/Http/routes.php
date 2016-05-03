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


// Break
Route::get('break/request', 'BreakController@request')->name('break.request');
Route::get('break/history', 'BreakController@history')->name('break.history');


Route::post('auth/register', 'Auth\AuthController@postRegister')->name('register.store');

// Roles
Route::get('staff/policies', 'StaffController@policies')->name('staff.policies');
Route::get('staff/policies/create', 'StaffController@addpolicies')->name('staff.policies.new');
Route::post('staff/policies/create', 'StaffController@addRole')->name('staff.policies.store');

Route::get('staff/policies/edit/{id}', 'StaffController@editpolicies')->name('staff.policies.edit');
Route::get('staff/policies/remove/{id}', 'StaffController@destroyRole')->name('staff.policies.remove');

// Permissions
Route::get('staff/permissions', 'StaffController@permissions')->name('staff.permissions');
Route::get('staff/permissions/create', 'StaffController@createPermission')->name('staff.permissions.create');
Route::post('staff/permissions/create', 'StaffController@savePermission')->name('staff.permissions.store');

Route::get('staff/permissions/edit/{id}', 'StaffController@EditPermission')->name('staff.permissions.edit');
Route::get('staff/permissions/remove/{id}', 'StaffController@destroyPermission')->name('staff.permissions.remove');

// sick
Route::get('sick', 'SickController@index')->name('sick.index');
Route::get('sick/display/{id}', 'SickController@show')->name('sick.specific');

Route::get('sick/register', 'SickController@create')->name('sick.new');
Route::post('sick/register', 'SickController@store')->name('sick.store');

// Departments
Route::get('staff/departments', 'DepartmentsController@index')->name('staff.departments.index');
Route::post('staff/departments/destroy', 'DepartmentsController@destroy')->name('staff.departments.destroy');
Route::get('staff/departments/search', 'DepartmentsController@search')->name('staff.departments.search');
Route::get('staff/departments/edit/{id}', 'DepartmentsController@edit')->name('departments.edit');
Route::get('staff/departments/create', 'DepartmentsController@create')->name('staff.departments.new');
Route::post('staff/departments/docreate', 'DepartmentsController@store')->name('staff.departments.store');
Route::get('staff/departments/relationtest', 'DepartmentsController@relationtest')->name('staff.departments.relationtest');


// Teams
Route::get('staff/teams', 'TeamsController@index')->name('staff.teams');
Route::get('/staff/teams/edit/{id}', 'TeamsController@edit')->name('staff.teams.edit');
Route::post('/staff/teams/edit/{id}', 'TeamsController@update')->name('staff.teams.update');
Route::get('staff/teams/create', 'TeamsController@create')->name('staff.teams.new');
Route::post('staff/teams/create', 'TeamsController@store')->name('staff.create.store');
Route::get('/staff/teams/remove/{id}', 'TeamsController@destroy')->name('staff.teams.destroy');

// Types.
Route::get('types', 'TypesController@index')->name('type.index');
Route::get('types/create', 'TypesController@create')->name('type.insert');
Route::post('types/create', 'TypesController@store')->name('type.store');
Route::get('types/delete/{id}', 'TypesController@destroy')->name('type.delete');

// Tasks
Route::get('tasks', 'TaskController@index')->name('task.index');
Route::get('tasks/display/{id}', 'TaskController@show')->name('task.specific');

Route::get('tasks/register', 'SickController@create')->name('task.new');
Route::post('tasks/register', 'SickController@store')->name('task.store');

// Settings
Route::get('settings/backup', 'SettingsController@backupView')->name('settings.backup');


Route::get('settings/general', 'SettingsController@basicView')->name('settings.general');
Route::post('settings/general', 'SettingsController@generalUpdate')->name('settings.generalUpdate');

Route::get('staff/create', 'StaffController@create')->name('staff.create');
Route::post('staff/create', 'StaffController@store')->name('staff.store');
Route::get('staff/edit/{id}', 'StaffController@edit')->name('staff.edit');
Route::get('staff/remove/{id}', 'StaffController@destroy')->name('staff.destroy');
