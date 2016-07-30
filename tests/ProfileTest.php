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
 * Testing the functionality where users can change their credentials.
 */
class ProfileTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;
    /**
     * GET profile/changepass
     *
     * @group all
     * @group profile
     */
    public function testProfileChangepassget()
    {
        $user = factory(App\User::class)->create();
        $this->actingAs($user)->visit('profile/changepass')->seeStatusCode(200);
    }

    /**
     * PUT profile/changepass
     *
     * @group all
     * @group profile
     */
    public function testProfileChangepassPut()
    {
        // TODO: write test.
    }
}
