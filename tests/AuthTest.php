<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AuthTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * POST /auth/login
     *
     * @group all
     * @group auth
     */
    public function testAuthLoginPost()
    {
        //
    }

    /**
     * GET /auth/login
     *
     * @group all
     * @group auth
     */
    public function testAuthLoginGet()
    {
        //
    }

    /**
     * GET: /auth/register
     *
     * @group all
     * @group auth
     */
    public function testAuthRegisterGet()
    {
        //
    }

    /**
     * POST /auth/register
     *
     * @group all
     * @group auth
     */
    public function testAuthRegisterPost()
    {
        //
    }

    /**
     * GET /auth/logout
     *
     * @group all
     * @group auth
     */
    public function testAuthLogoutGet()
    {
        $user = factory(App\User::class)->create();
        $this->actingAs($user)->visit('auth/logout')->seeStatusCode(200);
    }
}
