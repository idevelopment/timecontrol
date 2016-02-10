<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Departments extends Model
{
    protected $table = 'departments';

    public function teams()
    {
        return $this->belongsToMany('App\Teams');
    }

}
