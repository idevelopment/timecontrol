<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Departments;
use App\DepartmentMembers;
use Mail;
use App\User;
use App\Http\Controllers\Controller;

/**
 * Class DepartmentsController
 * @package App\Http\Controllers
 */
class DepartmentsController extends Controller
{
    /**
     * DepartmentsController Constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('lang');
    }

    /**
     * Get the departments index.
     *
     * @return view
     */ 
    public function index()
    {
        $departments = Departments::orderBy('department_name', 'asc')->with('managers')->paginate(10);
        return view('departments/list', ['departments' => $departments]);
    }

    /**
     * Create a new department.
     * 
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $managers = User::all();
        return view('departments/create', ['managers' => $managers]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Requests\DepartmentsValidator|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Requests\DepartmentsValidator $request)
    {
        session()->flash('message', trans('FlashSession.departmentNew'));
        return redirect('staff/departments');
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
        $data['query'] = Departments::all($id);
        return view('departments/edit', $data);
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
        Departments::all($id)->update(/* Values */);

        return redirect()->back(302);
    }

    /**
     * Search a department in the database.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $term = $request->get('name');

        if (empty($term)) {
            return redirect('staff/departments', 302);
        }

        $data['departments'] = Departments::where('department_name', 'LIKE', "%$term%")
            ->orderBy('department_name', 'asc')
            ->with('managers')
            ->paginate(10);

        return view('departments/list', $data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $query = Departments::destroy($request->get('department_id'));
        session()->flash('message', trans('FlashSession.departmentDestroy'));

        return redirect()->back(302);
    }
}
