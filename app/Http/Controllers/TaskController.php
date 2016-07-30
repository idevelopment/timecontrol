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
     * @param  Requests\taskRequestValidator $input
     * @return \Illuminate\Http\Response
     */
    public function store(Requests\taskRequestValidator $input)
    {
        $db              = new TasksRequest;
        $db->type        = $input->type;
        $db->status      = 0;
        $db->description = $input->description;
        $db->startdate   = $input->startdate;
        $db->enddate     = $input->enddate;
        $db->assignee()->associate($input->userid);
        $db->requestUser()->associate(auth()->user()->id);
        $db->save();

        session()->flash('message', 'Task has been added');
        return redirect()->back();
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
        $data['users'] = User::all();
        $data['tasks'] = Tasks::all();
        $data['task']  = TasksRequest::find($id);

        return view('tasks.edit_task', $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Requests\taskValidator $input
     * @param  int $id, the task request id.
     * @return \Illuminate\Http\Response
     */
    public function update(Requests\taskValidator $input, $id)
    {
        $db              = new TasksRequest;
        $db->type        = $input->type;
        $db->status      = 0;
        $db->description = $input->description;
        $db->startdate   = $input->startdate;
        $db->enddate     = $input->enddate;
        $db->assignee()->associate($input->userid);
        $db->save();

        session()->flash('message', 'Task has been update');
        return redirect()->back();
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
