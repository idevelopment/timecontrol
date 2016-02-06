<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sick extends Model
{
    protected $table = 'absenteeism';


    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
