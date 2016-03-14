<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TeamsTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * GET staff/teams
     *
     * @group staff/all
     * @group teams
     */
    public function testStaffItemsGet()
    {
        $user = factory(App\User::class)->create();
        $this->actingAs($user)->visit('staff/teams')->seeStatusCode(200);
    }

    /**
     * GET staff/teams/create
     *
     * @group all
     * @group teams
     */
    public function testStaffItemsCreateGet()
    {
        //
    }

    /**
     * POST staff/teams/create
     *
     * @group all
     * @group teams
     */
    public function testStaffItemsCreatePost()
    {
        //
    }
}
