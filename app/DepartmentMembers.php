<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DepartmentMembers extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'department_members';
    
    /**
     * members relation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function members()
    {
        return $this->belongsToMany('App\DepartmentMembers');
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
