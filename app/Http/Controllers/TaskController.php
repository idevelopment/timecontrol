<?php

namespace App\Http\Controllers;

use App\TasksRequest;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\User;
use App\Tasks;

/**
 * Class TaskController
 * @package App\Http\Controllers
 */
class TaskController extends Controller
{
    /**
     * TaskController constructor.
     */ 
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('lang');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $input)
    {
        $term = $input->get('term');

        if (isset($term)) {
            $data['tasks'] = TasksRequest::where('type', 'LIKE', "%$term%")->paginate(15);
        } else {
            $data['tasks'] = TasksRequest::paginate(15);
        }

        return view("tasks.manage_tasks", $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data['users'] = User::all();
        $data['tasks'] = Tasks::all();

        return view("tasks.request_task", $data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Requests\taskRequestValidator $request
     * @return \Illuminate\Http\Response
     */
    public function store(Requests\taskRequestValidator $request)
    {
        // Inputs from the form
        // ------------------------
        //
        // description
        // employee
        // type
        // start_date
        // stop_date
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id, The id off the task in the database.
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id The id off the task in the database.
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Requests\taskValidator $request
     * @param  int $id, the task request id.
     * @return \Illuminate\Http\Response
     */
    public function update(Requests\taskValidator $request, $id)
    {
        // Inputs from the form
        // ------------------------
        //
        // description
        // employee
        // type
        // start_date
        // stop_date
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        TasksRequest::destroy($request->get('integer'));
        session()->flash('message', trans('FlashSession.tasksDestroy'));

        return redirect()->back();
    }
}
