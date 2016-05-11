<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Sick;
use App\User;
use App\Http\Controllers\Controller;

/**
 * Class SickController
 * @package App\Http\Controllers
 */
class SickController extends Controller
{
    /**
     * SickController constructor
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
        $adata = sick::All();
        return view('sick/home', ['adata' => $adata]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::All();
        return view('sick/register', ['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'type' => 'required',
            'start_date' => 'required',
            'stop_date' => 'required',
            'employee' => 'required',
        ]);

        $matchThese = ['user_id' => $request->get('employee'), 'start_date' => $request->get('start_date')];
        $verify = sick::where($matchThese)->first();
        if ($verify === null) {
            // user doesn't exist

            $data = new sick;
            $data->type = $request->get('type');
            $data->start_date = $request->get('start_date');
            $data->end_date = $request->get('stop_date');
            $data->user_id = $request->get('employee');
            $data->description = $request->get('description');
            $data->save();
            
            $subject = \Lang::get('tasks.new_sick_notification');
            $mailbox = env('MAIL_USERNAME');

            session()->flash('message', trans('FlashSession.sickStoreSucces'));
            \Mail::send('emails.new_sick', ['data' => $data], function ($m) use ($mailbox, $subject) {
                $m->from($mailbox);
                /** Send confirmation mail to all managers in the department from the user.
                *$m->to("")->subject("$subject");
                */
            });

            return redirect('sick');
        } else {
            \Session::flash('error', trans('FlashSession.sickStoreFailure'));
            return redirect('sick');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = sick::where('absenteeism_id', $id)->get();
        return view('sick/info', ['data' => $data, 'data_id' => $id]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
