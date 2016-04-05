<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;

use App\Departments;
use App\Teams;
use App\User;

use App\Http\Controllers\Controller;

class TeamsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display all teams.
     */
    public function index()
    {
        $teams = Teams::orderBy('name', 'asc')->paginate(10);;
        return view('teams/list', ['teams' => $teams]);
    }

    /**
     * Show the form for creating a new team.
     */
    public function create()
    {
        $data["departments"] = Departments::all();
        $data["users"] = User::all();
        return view('teams/create', $data);
    }

    /**
     * Store a newly created team in database.
     */
    public function store(Request $request)
    {
        $team = new Teams;
        $team->name = $request->team_name;
        $team->name = $request->team_description;
        $team->save();
    }

    /**
     * Display details from the specified team.
     */

    public function show($id)
    {
        return view('teams/show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified team in the database.
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified team from the database.
     *
     * @param integer, $id, The id off the team in the database.
     */
    public function destroy($id)
    {
        Teams::destroy($id);
        session()->flash('message', 'Team successfully deleted');

        return redirect()->back();
    }
}
