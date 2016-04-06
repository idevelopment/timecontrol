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
     * @group all
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
        $user = factory(App\User::class)->create();
        $this->actingAs($user)->visit('staff/teams/create')->seeStatusCode(200);
    }

    /**
     * POST staff/teams/create
     *
     * @group all
     * @group teams
     */
    public function testStaffItemsCreatePost()
    {
        $user = factory(App\User::class)->create();

        $route = $this->actingAs($user);
        $route->post('staff/teams/create', $data);
        $route->seeStatusCode(302);
    }

    /**
     * GET: /staff/teams/remove/{id}
     *
     * @group all
     * @group teams
     */
    public function testStaffTeamsDelete()
    {
        $user = factory(App\User::class)->create();
        $team = factory(App\Teams::class)->create();

        $route = $this->actingAs($user);
        $route->visit('/staff/teams/remove/' . $team->id);
        $route->seeStatusCode(200);
    }
}
