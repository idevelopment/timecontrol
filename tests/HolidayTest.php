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
 * Testing functionality off the holiday routes for the front and backend.
 */
class HolidayTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * GET:
     *
     * @group all
     * @group holidays
     */
    public function testIndex()
    {
        $user = factory(App\User::class)->create();

        $this->actingAs($user);
    }

    /**
     * GET:
     *
     * @group all
     * @group holidays
     */
    public function testHolidaySpecific()
    {
        $user = factory(App\User::class)->create();

        $this->actingAs($user);
    }

    /**
     * GET:
     *
     * @group all
     * @group holidays
     */
    public function testHolidayRegisterGet()
    {
        $user = factory(App\User::class)->create();

        $this->actingAs($user);

    }

    /**
     * POST:
     *
     * @group all
     * @group holidays
     */
    public function testHolidayRegisterPost()
    {
        $user = factory(App\User::class)->create();

        $this->actingAs($user);
    }

    /**
     * GET: holidays/delete
     *
     * @group all
     * @group holidays
     */
    public function testHolidayDelete()
    {
        $user = factory(App\User::class)->create();

        $this->actingAs($user);
    }
}
