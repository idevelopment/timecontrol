<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class TasksRequest
 * @package App
 */
class TasksRequest extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tasks_requests';

    /**
     * TASK -> USER REQUEST. TO DETERMOINE HO IS ASSIGNED
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assignee()
    {
        return $this->belongsTo('App\User', 'id', 'userid');
    }
}
