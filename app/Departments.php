<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property mixed department_name
 * @property mixed department_manager
 * @property mixed department_description
 */
class Departments extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'departments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['department_name', 'department_manager', 'department_description'];

    /**
     * Departments teams relation.
     *
     * @TODO   Make this relation work
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function teams()
    {
        return $this->belongsToMany('App\Teams');
    }

    /**
     * Manager relation.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function managers()
    {
        return $this->belongsToMany('App\User', 'departments_user', 'departments_id', 'user_id');
    }

    /**
     * Members relation.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function members()
    {
        return $this->belongsToMany('App\DepartmentMembers', 'departments_user', 'departments_id', 'user_id');
    }    
}
