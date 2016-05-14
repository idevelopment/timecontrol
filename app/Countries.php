<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Countries
 * @package App
 */
class Countries extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Countries';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['country'];
}
