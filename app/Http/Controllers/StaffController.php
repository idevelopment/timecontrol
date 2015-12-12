<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
class StaffController extends Controller
{

  public function __construct()
  {
      $this->middleware('auth');
  }


    /**
     * Display all users.
     */
    public function index()
    {
        $users = User::all();
        return view('staff/users', ['users' => $users]);
    }

    /**
     * Show the form for creating a new employee.
     *
     */
    public function create()
    {
        return view('staff/create_user');
    }

    /**
     * Store a newly created employee in storage.
     *
     */
    public function store(Request $request)
    {
      $user = new User;
      $user->fname = $request->get('fname');
      $user->name = $request->get('name');
      $user->address = $request->get('address');
      $user->postal_code = $request->get('postal_code');
      $user->city = $request->get('city');
      $user->email = $request->get('email');
      $user->password = bcrypt($request->get('password'));
      $user->save();

      $mailbox = env('MAIL_USERNAME');
      $mail_password = $request->get('password');
      \Session::flash('message', "New employee has been added to the application");
      \Mail::send('emails.new_user', ['user' => $user, 'password' => $mail_password], function ($m) use ($user, $mailbox) {
                  $m->from($mailbox);
                  $m->to($user->email)->subject('Your user credentials!');
      });
      return redirect('staff');
    }

    public function updateUser($id, Request $request)
    {
        $user = User::find($id);
        $user->fname = $request->get('fname');
        $user->name = $request->get('name');
        $user->address = $request->get('address');
        $user->postal_code = $request->get('postal_code');
        $user->city = $request->get('city');
        $user->email = $request->get('email');
        $user->assignRole($request->get('user_type'));
        $user->update();

        \Session::flash('message', "User details have been updated");
        return \Redirect::back();
    }


    public function policies()
   {

    $roles = Role::all();

    return view('staff/roles', ['roles' => $roles]);
   }

    public function addpolicies()
   {

    $permissions = Permission::all();
    return view('staff/create_role', ['permissions' => $permissions]);
   }


   public function addRole(Request $request)
   {

    $role = Role::create(['name' => $request->get('role_name'),'description' => $request->get('role_description')
                          ]);
    \Session::flash('message', 'New user role has been created');
      return redirect('staff/policies');

   }

   public function editpolicies($id)
   {

     $role = Role::find($id);
     $permissions = Permission::all();

     return view('staff/edit_role', ['permissions' => $permissions]);
   }

    /**
     *
     * Remove the user role.
     *
     */
    public function destroyRole($id)
    {
      $role = Role::find($id);
      $role->delete();
      \Session::flash('message', "User role has been removed from the database");
      return redirect('staff/policies');
    }


    /**
     *
     * Show all permission.
     *
     */
    public function permissions()
    {
       $permissions = Permission::all();
       return view('staff/permissions', ['permissions' => $permissions]);
    }

    /**
     *
     * Show the form to create a new permission.
     *
     */
    public function create_permission()
    {

       return view('staff/create_permission');
    }

    /**
     *
     * Save the new permission.
     *
     */
    public function save_permission(Request $request)
    {

     $permission = Permission::create(['name' => 'manage break']);
     return redirect('staff/permissions');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $roles = Role::all();
        $user = User::find($id);
        return view("staff/edit_user", ['roles' => $roles, 'user' => $user]);
    }


    public function profile()
    {
        return view("staff/profile");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $user = User::find($id);
      $user->delete();
      \Session::flash('message', "User has been removed from the database");
      return redirect('staff');
    }
}
