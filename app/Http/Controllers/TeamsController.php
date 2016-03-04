<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use App\Teams;

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
        $teams = Teams::all();
        return view('teams/list', ['teams' => $teams]);
    }

    /**
     * Show the form for creating a new team.
     */
    public function create()
    {
        $users = User::all();
        return view('teams/create', ['users' => $users]);
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
     */
    public function destroy($id)
    {
        //
    }
}
