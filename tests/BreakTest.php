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
 * Testing out the Break controller functionality.
 */
class BreakTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;
    /**
     * GET: break/request
     *
     * @group all
     * @group break
     */
    public function testBreakRequestGet()
    {
        $user = factory(App\User::class)->create();

        $route = $this->actingAs($user);
        $route->visit('break/request');
        $route->seeStatusCode(200);
    }

    /**
     * GET: break/history
     *
     * @group all
     * @group break
     */
    public function testBreakHistoryGet()
    {
        $user = factory(App\User::class)->create();

        $route = $this->actingAs($user);
        $route->visit('break/history');
        $route->seeStatusCode(200);
    }
}
