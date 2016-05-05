<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Departments;
use App\DepartmentMembers;
use Mail;
use App\User;
use App\Http\Controllers\Controller;

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
     * This is nothing for in the controller.
     * If you want to test this. You should create a phpunit function for the relation.$_COOKIE
     * 
     * TODO: Create phpunit testing function.
     */
    public function relationtest()
    {
        $departments = DepartmentMembers::All();
        return $departments;
    }    

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
        // TODO: Check for mass assign - SQL queries.
        
        $departments = new Departments;
        $departments->department_name = $request->get('department_name');
        $departments->department_manager = $request->get('department_manager');
        $departments->department_description = $request->get('department_description');
        $departments->save();

        $department_id = $departments->id;

        $manager = new DepartmentMembers;
        $manager->departmentid = $department_id;
        $manager->userid = $request->get('department_manager');
        $manager->save();

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
        return view('departments/edit');
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
