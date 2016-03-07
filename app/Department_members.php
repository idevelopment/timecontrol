<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Department_members extends Model
{
    /**
     * members relation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function members()
    {
        return $this->belongsToMany('App\Department_members');
    }

    /**
     * teams relation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function teams()
    {
        return $this->belongsToMany('App\Teams');
    }
}
