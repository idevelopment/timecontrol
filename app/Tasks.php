<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Tasks
 * @package App
 */
class Tasks extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tasks';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'priority'];
}
