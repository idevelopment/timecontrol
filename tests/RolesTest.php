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
 * Testing the roles controller.
 */
class RolesTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * GET staff/policies
     *
     * @group all
     * @group roles
     */
    public function testStaffPoliciesGet()
    {
        $user = factory(App\User::class)->create();
        $this->actingAs($user)->visit('staff/policies')->seeStatusCode(200);
    }

    /**
     * GET staff/policies/create
     *
     * @group all
     * @group roles
     */
    public function testStaffPoliciesCreateGet()
    {
        $user = factory(App\User::class)->create();
        $this->actingAs($user)->visit('staff/policies/create')->seeStatusCode(200);
    }

    /**
     * POST staff/policies/create
     *
     * @group all
     * @group roles
     */
    public function testStaffPoliciesCreatePost()
    {
        $user = factory(App\User::class);
        $perm = factory(App\Permission::class);

        // $route = $this->actingAs($user);

    }

    /**
     * GET staff/policies/edit/{id}
     *
     * @group all
     * @group roles
     */
    public function testStaffPoliciesEditIdGet()
    {
        $user = factory(App\User::class)->create();
        $perm = factory(App\Permission::class)->create();

        $this->actingAs($user)->visit('staff/policies/edit/' . $perm->id)->seeStatusCode(200);
    }

    /**
     * GET /staff/policies/remove/{id}
     *
     * @group all
     * @group roles
     */
    public function testStaffPoliciesRemoveIdGet()
    {
        $user = factory(App\User::class)->create();
        $perm = factory(App\Permission::class)->create();

        // $route = $this->actingAs($user);
        // $route->visit('staff/policies/remove/' . $user->id);
        // $route->seeStatusCode(200);
    }
}
