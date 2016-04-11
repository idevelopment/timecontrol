<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Teams extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'teams';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'manager', 'description'];

    /**
     * Departements relation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function departments()
    {
        return $this->belongsToMany('App\Departments');
    }

    /**
     * The employees relation.
     *
     * Get all the employees setted on the teams.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function employee()
    {

    }
}
