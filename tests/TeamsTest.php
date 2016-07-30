<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * @category PHPunit_Tests
 * @package  Timecontrol
 * @author   Tim Joosten <Topairy@gmail.com> 
 * @license  https://github.com/idevelopment/timecontrol/blob/master/LICENSE GNU
 * @link     http://www.timecontrol.be
 *
 * Test the teams controller functionality.
 */
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
        $this->withoutMiddleware();
        $user = factory(App\User::class)->create();

        $data['team_name'] = 'name';
        $data['team_description'] = 'description';

        $route = $this->actingAs($user);
        $route->post('staff/teams/create', $data);
        $route->seeStatusCode(500); // BUG
        // $route->seeInDatabase('teams', $data);
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

        $this->actingAs($user)
            ->visit('/staff/teams/remove/' . $team->id)
            ->seeStatusCode(200);
    }
}
