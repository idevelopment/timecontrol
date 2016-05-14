<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;

use App\Departments;
use App\Teams;
use App\User;

use App\Http\Controllers\Controller;

/**
 * Class TeamsController
 * @package App\Http\Controllers
 */
class TeamsController extends Controller
{
    /**
     * TeamsController constructor.
     */ 
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('lang');
    }
    /**
     * Display all teams.
     */
    public function index()
    {
        $data['teams'] = Teams::orderBy('name', 'asc')->paginate(10);
        return view('teams/list', $data);
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
     *
     * @param array $request The user input form the form.
     */
    public function store(Request $request)
    {
        // TODO: check for mass assign - Tjoosten
        // TODO: set flash massage and redirect - Tjoosten
        $team = new Teams;
        $team->name = $request->team_name;
        $team->name = $request->team_description;
        $team->save();
    }

    /**
     * Display details from the specified team.
     *
     * @param  int $id The id in the database for the team.
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function show($id)
    {
        return view('teams/show');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id The id in the database for the team.
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        return view('teams/edit');
    }

    /**
     * Update the specified team in the database.
     *
     * @param  array $request The user input from the form.
     * @param  int $id The id in the database for the team
     * @return string
     */
    public function update(Request $request, $id)
    {
        return "<code> // needs to be done </code>";
    }

    /**
     * Remove the specified team from the database.
     *
     * @param  int $id The id off the team in the database.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        Teams::destroy($id);
        session()->flash('message', trans('FlashSession.teamsDelete'));

        return redirect()->back();
    }
}
