<?php

namespace App\Http\Controllers;

use App\Holidays;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class HolidaysController extends Controller
{
    /**
     * HolidaysController constructor.
     */
    public function __construct()
    {
        $this->middleware('lang');
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['query'] = Holidays::with('users')->paginate(15);
        return view('holidays/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('holidays/request');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Requests\HolidayValidator $input
     * @return \Illuminate\Http\Response
     */
    public function store(Requests\HolidayValidator $input)
    {
        $holiday                = new Holidays();
        $holiday->user_id       = auth()->user()->id;
        $holiday->type          = '';
        $holiday->department_id = '';
        $holiday->from          = '';
        $holiday->until         = '';
        $holiday->description   = '';
        $holiday->save();

        session()->flash('message', '');
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data['query'] = Holidays::with('users')->where('id', $id)->get();
        return view('', $data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int | $id | The database id.
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data['query'] = Holidays::find($id);
        return view('', $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Requests\HolidayValidator $input
     * @param  int | $id | The database id.
     * @return \Illuminate\Http\Response
     */
    public function update(Requests\HolidayValidator $input, $id)
    {
        Holidays::find($id)->update([
            'user_id' => auth()->user()->id
        ]);

        session()->flash('message', '');
        return redirect()->back(302);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int | $id | The database id.
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Holidays::destroy($id);
        session()->flash('message', 'Vacation request deleted.');
        return redirect()->back(302);
    }
}
