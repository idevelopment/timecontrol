<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Department_members extends Model
{
  public function members()
  {
      return $this->belongsToMany('App\Department_members');
  }

  public function teams()
  {
      return $this->belongsToMany('App\Teams');
  }
}
