<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;


class SettingsController extends Controller
{
    /**
     * SettingsController Constructor 
     */ 
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function basicView()
    {

    $data['date_formats'] = array(
    'Y-m-d' => '2010-12-23',
    'm-d-Y' => '12-23-2010',
    'd-m-Y' => '23-12-2010',
    'Y/m/d' => '2010/12/23',
    'm/d/Y' => '12/23/2010',
    'd/m/Y' => '23/12/2010',
    'Y.m.d' => '2010.12.23',
    'd.m.Y' => '23.12.2010',
    'm.d.Y' => '12.23.2010',
  );

    $data['time_formats'] = array (
    'H:i' => '23:00',
    'h:ia' => '11:00pm',
    'h:iA' => '11:00PM',
    'h:i a' => '11:00 pm',
    'h:i A' => '11:00 PM',
  );
    
    $data['title'] = config('timecontrol.title');
    $data['email'] = config('timecontrol.email');
    $data['date'] = config('timecontrol.date');
    $data['time'] = config('timecontrol.time');

     return view('settings/basic', $data);
    }

    /**
     * Update the basic settings.
     *
     * @param  \Illuminate\Http\Request  $request     
     * @return \Illuminate\Http\Response
     */
    public function generalUpdate(Request $request)
    {

        $config = new \Larapack\ConfigWriter\Repository('timecontrol');
        $config->set('title', $request->get('title')); 
        $config->set('email', $request->get('email')); 
        $config->set('date', $request->get('date')); 
        $config->set('time', $request->get('time'));
        $config->save(); 

        if ($config) {
            sleep(3);
            session()->flash('message', 'Settings have been saved');
            return redirect('settings/general');
        } else {
            session()->flash('message', 'Settings have not been saved, please verify');
            return redirect('settings/general');
        }
    }

    /**
     * Display a form to configure the backup settings.
     *
     * @return \Illuminate\Http\Response
     */
    public function backupView()
    {
        $data['include'] = config('laravel-backup.backup.source.files.include');
        $data['exclude'] = config('laravel-backup.backup.source.files.exclude');

        $data['keepAllBackupsForDays'] = config('laravel-backup.cleanup.defaultStrategy.keepAllBackupsForDays');

        return view('settings/backup', $data);
    }
}
