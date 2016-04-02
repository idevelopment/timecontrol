<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sick extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'absenteeism';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['type', 'start_date', 'end_date', 'user_id', 'description'];

    /**
     * Sickness relation tot the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
