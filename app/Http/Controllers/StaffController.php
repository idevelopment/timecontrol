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


    public function policies()
   {

    $roles = Role::all();
    return view('staff/roles', ['roles' => $roles]);
   }

    public function addpolicies()
   {

    //$roles = Role::all();
    return view('staff/create_role');
   }


   public function addRole(Request $request)
   {

    $role = Role::create(['name' => $request->get('role_name'), 'description' => $request->get('role_description')]);
      return redirect('staff/policies');

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
        return view("staff/edit_user");
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
