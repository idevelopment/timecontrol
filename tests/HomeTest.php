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
 * Testing functionality off the home routes for the front and backend.
 */
class HomeTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * GET /
     *
     * @group all
     * @group home
     */
    public function testHomeGet()
    {
        $user = factory(App\User::class)->make();
        $this->actingAs($user)->visit('/')->seeStatusCode(200);
    }

    /**
     * GET /home
     *
     * @group all
     * @group home
     */
    public function testHomeLoginGet()
    {
        $user = factory(App\User::class)->make();
        $this->actingAs($user)->visit('home')->seeStatusCode(200);
    }
}
