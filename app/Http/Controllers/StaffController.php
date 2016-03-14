<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use App\Countries;
use App\Teams;
use App\Role;
use Illuminate\Support\Facades\Input;
use Intervention\Image\Facades\Image;
use App\Permission;

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
        $users = User::orderBy('fname', 'asc')->paginate(10);
        return view('staff/users', ['users' => $users]);
    }

    /**
     * Show the form for creating a new employee.
     *
     */
    public function create()
    {
        $countries = Countries::all();
        return view('staff/create_user', ['countries' => $countries]);
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
        $role = Role::create(['name' => $request->get('role_name')]);
        foreach ($request->get('permissions') as $permission) {
            $role->givePermissionTo($permission);
        }
        if($assign_role)
        {
        \Session::flash('message', 'New user role has been created');
        return redirect('staff/policies');
      }else {
        return "Mislukt";
      }
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
        // $permission_name = $request->get('permission_name');
     $permission = Permission::create(['name' => $request->get('permission_name')]);
        \Session::flash('message', "The new permission has been added to the database");
        return redirect('staff/permissions');
    }

    public function destroy_permission($id)
    {
        $permission = Permission::find($id);
        $permission->delete();
        \Session::flash('message', "Permission has been removed from the database");
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
     */
    public function edit($id)
    {
        $user = User::findOrFail($id);
        $teams = Teams::all();
        $countries = Countries::all();
        $roles = Role::all();
        return view("staff/edit_user", ['user' => $user, 'teams' => $teams, 'countries' => $countries, 'roles' => $roles]);
    }


    public function profile()
    {
        $countries = Countries::all();
        return view("staff/profile", ['countries' => $countries]);
    }

    public function chPass()
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = User::findOrFail(auth()->user()->id);
        $user->fname   = $request->get('email');
        $user->name    = $request->get('name');
        $user->email   = $request->get('email');
        $user->address = $request->get('address');
        $user->email   = 'john@foo.com';

        if(Input::file()) {
            $image = Input::file('avatar');
            $filename  = time() . '.' . $image->getClientOriginalExtension();
            $path = public_path('profilepics/' . $filename);

            Image::make($image->getRealPath())->resize(200, 200)->save($path);
            $user->image = $filename;
        }

        $user->save();

        return redirect()->back();
    }

    /**
     * Remove the specified employee from the database.
     *
     */
    public function destroy($id)
    {
        if (! Auth::user()->is('Administrator')) {
            return Redorect::back();
        }

        User::Destroy($id);
        session()->flash('message', "User has been removed from the database");
        return redirect('staff');
    }
}
