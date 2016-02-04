<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Absenteeism;
use App\User;

class AbsenteeismController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $adata = absenteeism::All();
        return view('absenteeism/home', ['adata' => $adata]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::All();
        return view('absenteeism/register', ['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
           'type' => 'required',
           'start_date' => 'required',
           'stop_date'  => 'required',
           'employee' => 'required',
       ]);

        $matchThese = ['user_id' => $request->get('employee'), 'start_date' => $request->get('start_date')];
        $verify = Absenteeism::where($matchThese)->first();
        if ($verify === null) {
            // user doesn't exist

        $data = new Absenteeism;
            $data->type = $request->get('type');
            $data->start_date = $request->get('start_date');
            $data->end_date = $request->get('stop_date');
            $data->user_id = $request->get('employee');
            $data->description = $request->get('description');
            $data->save();

            $user_id = $request->get('employee');
            $mailbox = env('MAIL_USERNAME');
            \Session::flash('message', "Information has been saved to the database");
            \Mail::send('emails.new_absenteeism', ['data' => $data],
        function ($m) use ($mailbox) {
                    $m->from($mailbox);
                    $m->to("glenn.hermans@idevelopment.be")->subject('New absenteeism registration');
        });
            return redirect('absenteeism');
        } else {
            \Session::flash('error', "This data has already been saved");
            return redirect('absenteeism');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Absenteeism::findOrFail($id);
        return view('absenteeism/info', ['data' => $data, 'data_id' => $id]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }
}
