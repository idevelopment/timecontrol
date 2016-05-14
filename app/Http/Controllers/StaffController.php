<?php

namespace app\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use App\Countries;
use App\Departments;
use App\Teams;
use App\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Intervention\Image\Facades\Image;
use App\Permission;
use Bouncer;
use App\Http\Controllers\Controller;

/**
 * Class StaffController
 * @package app\Http\Controllers
 */
class StaffController extends Controller
{
    /**
     * StaffController constructor.
     */ 
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('lang');
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
     *
     * @return mixed
     */
    public function store(Requests\StaffValidator $request)
    {
        $user = new User();
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
        session()->flash('message', trans('FlashSession.newEmployee'));

        $injectionData = ['user' => $user, 'password' => $mail_password];

        Mail::send('emails.new_user', $injectionData, function ($m) use ($user, $mailbox) {
            $m->from($mailbox);
            $m->to($user->email)->subject('Your user credentials!');
        });

        return redirect('staff');
    }

    /**
     * Update a user.
     *
     * @param Int,    $id
     * @param Request $request
     *
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

        session()->flash('message', trans('FlashSession.staffUpdate'));

        return redirect()->back(302);
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
     *
     * @return string
     */
    public function addRole(Request $request)
    {
        $role = Role::create(['name' => $request->get('role_name')]);

        if ($role) {
            session()->flash('message', trans('FlashSession.insertRoleSuccess'));
            return redirect('staff/policies');
        } else {
            session()->flash('message', trans('FlashSession.insertRoleFailure'));
            return redirect()->back(302);
        }
    }

    /**
     * @param $id
     *
     * @return mixed
     */
    public function editpolicies($id)
    {
        $data['permissions'] = Permission::all();

        return view('staff/edit_role', $data);
    }

    /**
     * Remove the user role.
     *
     * @param int, $id
     *
     * @return redirect
     */
    public function destroyRole($id)
    {
        $role = Role::find($id);
        $role->delete();
        session()->flash('message', trans('FlashSession.roleDestroy'));

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
    public function createPermission()
    {
        return view('staff/create_permission');
    }

    /**
     * Show the form to edit a permission.
     */
    public function EditPermission(Request $request, $id)
    {
        $data['permission'] = Permission::find($id);
        return view('staff/edit_permission', $data);
    }

    /**
     * Save the new permission.
     *
     * @param Request $request
     *
     * @return redirect
     */
    public function savePermission(Request $request)
    {
        Permission::create(['name' => $request->get('permission_name')]);
        session()->flash('message', trans('FlashSession.insertPermission'));

        return redirect('staff/permissions');
    }

    /**
     * Delete a permission out off timecontrol.
     *
     * @param int, $id, the id off the permission.
     * @return Redirect
     */
    public function destroyPermission($id)
    {
        $permission = Permission::find($id);
        $permission->delete();

        session()->flash('message', trans('FlashSession.permissionDestroy'));

        return redirect('staff/permissions');
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $data['user']  = User::findOrFail($id);
        $data['departments'] = Departments::all();
        $data['teams'] = Teams::all();
        $data['countries'] = Countries::all();
        $data['roles'] = Role::all();

        return view('staff/edit_user', $data);
    }

    /**
     * @return mixed
     */
    public function profile()
    {
        $data['countries'] = Countries::all();

        return view('staff/profile', $data);
    }

    /**
     * change a password.
     */
    public function chPass()
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param Requests\accountManagementValidator|Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Requests\accountManagementValidator $request)
    {
        $user = User::findOrFail(auth()->user()->id);
        $user->fname = $request->get('email');
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->address = $request->get('address');
        $user->email = $request->get('email');

        if (Input::file()) {
            $image = Input::file('avatar');
            $filename = time().'.'.$image->getClientOriginalExtension();
            $path = public_path('profilepics/'.$filename);

            Image::make($image->getRealPath())->resize(200, 200)->save($path);
            $user->image = $filename;
        }

        $user->save();

        return redirect()->back();
    }

    /**
     * Remove the specified employee from the database.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!Auth::user()->is('Administrator')) {
            return Redirect::back();
        }

        User::Destroy($id);
        session()->flash('message', trans('FlashSession.staffDestroy'));

        return redirect('staff');
    }
}
