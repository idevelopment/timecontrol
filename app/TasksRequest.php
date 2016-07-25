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
    protected $fillable = [
        'requester', 'userid', 'type', 'status',
        'startdate', 'enddate', 'description'];

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
        return $this->belongsTo('App\User', 'userid', 'id');
    }

    /**
     * TASK -> REQUESTER to see the data who request this tasks.
     *
     */
    public function requestUser()
    {
        return $this->belongsTo('App\User', 'requester', 'id');
    }
}
