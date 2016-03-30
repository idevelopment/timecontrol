<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use App\Countries;
use App\Teams;
use App\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Intervention\Image\Facades\Image;
use App\Permission;
use Bouncer;

class StaffController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display all users.
     *
     * @return mixed
     */
    public function index()
    {
        $data['users'] = User::orderBy('fname', 'asc')->paginate(10);
        return view('staff/users', $data);
    }

    /**
     * Show the form for creating a new employee.
     *
     * @return mixed
     */
    public function create()
    {
        $data['countries'] = Countries::all();
        return view('staff/create_user', $data);
    }

    /**
     * Store a newly created employee in storage.
     *
     * @param Requests\StaffValidator|Request $request
     * @return mixed
     */
    public function store(Requests\StaffValidator $request)
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
        session()->flash('message', "New employee has been added to the application");

        Mail::send('emails.new_user', ['user' => $user, 'password' => $mail_password], function ($m) use ($user, $mailbox) {
            $m->from($mailbox);
            $m->to($user->email)->subject('Your user credentials!');
        });

        return redirect('staff');
    }

    /**
     * Update a user.
     *
     * @param  Int, $id
     * @param  Request $request
     * @return mixed
     */
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

        $user = User::find($id);
        Bouncer::assign($request->get('user_typ'))->to($user);

        session()->flash('message', "User details have been updated");
        return \Redirect::back();
    }


    /**
     * @return mixed
     */
    public function policies()
    {
        $data['roles'] = Role::all();
        return view('staff/roles', $data);
    }

    /**
     * @return mixed
     */
    public function addpolicies()
    {
        $data['permissions'] = Permission::all();
        return view('staff/create_role', $data);
    }


    /**
     * @param Request $request
     * @return string
     */
    public function addRole(Request $request)
    {
        $role = Role::create(['name' => $request->get('role_name')]);
        foreach ($request->get('permissions') as $permission) {
            $role->givePermissionTo($permission);
        }
        if ($assign_role) {
            session()->flash('message', 'New user role has been created');
            return redirect('staff/policies');
        } else {
            return "Mislukt";
        }
    }

    /**
     * @param $id
     * @return mixed
     */
    public function editpolicies($id)
    {
        $role = Role::find($id);
        $data['permissions'] = Permission::all();

        return view('staff/edit_role', $data);
    }

    /**
     * Remove the user role.
     *
     * @param  int, $id
     * @return redirect
     */
    public function destroyRole($id)
    {
        $role = Role::find($id);
        $role->delete();
        session()->flash('message', "User role has been removed from the database");
        return redirect('staff/policies');
    }


    /**
     * Show all permission.
     */
    public function permissions()
    {
        $data['permissions'] = Permission::all();
        return view('staff/permissions', $data);
    }

    /**
     * Show the form to create a new permission.
     */
    public function create_permission()
    {
        return view('staff/create_permission');
    }

    /**
     *
     * Save the new permission.
     *
     * @param  Request $request
     * @return redirect
     */
    public function save_permission(Request $request)
    {
        // $permission_name = $request->get('permission_name');
        $permission = Permission::create(['name' => $request->get('permission_name')]);
        session()->flash('message', "The new permission has been added to the database");
        return redirect('staff/permissions');
    }

    public function destroy_permission($id)
    {
        $permission = Permission::find($id);
        $permission->delete();

        session()->flash('message', "Permission has been removed from the database");
        return redirect('staff/permissions');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     * @param $id
     * @return
     */
    public function edit($id)
    {
        $data['user'] = User::findOrFail($id);
        $data['teams'] = Teams::all();
        $data['countries'] = Countries::all();
        $data['roles'] = Role::all();
        return view("staff/edit_user", $data);
    }


    /**
     * @return mixed
     */
    public function profile()
    {
        $data['countries'] = Countries::all();
        return view("staff/profile", $data);
    }

    /**
     * change a password
     */
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
        $user->fname = $request->get('email');
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->address = $request->get('address');
        $user->email = 'john@foo.com';

        if (Input::file()) {
            $image = Input::file('avatar');
            $filename = time() . '.' . $image->getClientOriginalExtension();
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
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (! Auth::user()->is('Administrator')) {
            return Redirect::back();
        }

        User::Destroy($id);
        session()->flash('message', "User has been removed from the database");
        return redirect('staff');
    }
}
