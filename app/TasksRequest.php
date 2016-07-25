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
     * Mass assign fields.
     *
     * @var array
     */
    protected $fillable = ['requester', 'user_id', 'type', 'status', 'startdate', 'enddate'];

    /**
     * Hidden fields
     *
     * @var array
     */
    protected $hidden = ['created_at', 'updated_at'];

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

    /**
     * TASK -> REQUESTER to see the data who request this tasks.
     *
     */
    public function requester()
    {
        return $this->belongsTo('App\User', 'id', 'requester');
    }
}
