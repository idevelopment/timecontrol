<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Holidays
 * @package App
 */
class Holidays extends Model
{
    /**
     * Deartments relation.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function departments()
    {
        $this->belongsToMany('App\Departments');
    }

    /**
     * Users relation.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany('App\User');
    }
}
