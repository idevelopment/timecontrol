<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

/**
 * Class HomeController
 * @package App\Http\Controllers
 */
class HomeController extends Controller
{

    /**
     * HomeController constructor.
     */ 
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('lang');
    }


    public function index()
    {
        return view('home/index');
    }
}
