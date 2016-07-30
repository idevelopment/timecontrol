<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Silber\Bouncer\Database\HasRolesAndAbilities;

/**
 * @property mixed fname
 * @property mixed name
 * @property mixed address
 * @property mixed postal_code
 * @property mixed city
 * @property mixed email
 * @property mixed password
 */
class User extends Model implements AuthenticatableContract,
                                    AuthorizableContract,
                                    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword, HasRolesAndAbilities;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'fname', 'address', 'postal_code', 'city', 'country', 'email', 'password'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * Return the departments where the user is manager off.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function departmentManager()
    {
        return $this->belongsToMany('App\Departments');
    }

    /**
     * Return the teams where the user is in.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function teams()
    {
        return $this->belongsToMany('App\Teams');
    }

    /**
     * Users > Break Queue Relations
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function breakQueue()
    {
        return $this->belongsToMany('App\BreakQueue');
    }

    /**
     * Users > break relation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function break()
    {
        return $this->belongsToMany('App\Break');
    }
}
