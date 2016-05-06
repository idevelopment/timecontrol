<?php

namespace App\Http\Controllers;

use App\TasksRequest;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

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
    public function index()
    {
        $data['tasks'] = TasksRequest::paginate(15);
        return view("tasks.manage_tasks", $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Requests\taskRequestValidator $request
     * @return \Illuminate\Http\Response
     */
    public function store(Requests\taskRequestValidator $request)
    {
       //
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
        //
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
        session()->flash('message', 'The tasks are deleted.');

        return redirect()->back();
    }
}
