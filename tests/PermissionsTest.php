<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PermissionsTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * GET staff/permissions
     *
     * @group all
     * @group permissions
     */
    public function testStaffPermissions()
    {

    }

    /**
     * GET staff/permissions/create
     *
     * @group all
     * @group permissions
     */
    public function testStaffPermissionCreateGet()
    {
        $user = factory(App\User::class)->create();
        $this->actingAs($user)->visit('staff/permissions/create')->seeStatusCode(200);
    }

    /**
     * POST staff/permissions/create
     *
     * @group all
     * @group permissions
     */
    public function testStaffPermissionsCreatePost()
    {
        //
    }

    /**
     * GET staff/permissions/edit/{id}
     *
     * @group all
     * @group permissions
     */
    public function testStaffPermissionsEditIdGet()
    {
        // TODO: Needs debug.
        // $user = factory(App\User::class)->create();
        // $this->actingAs($user)->visit('staff/permissions/edit/1')->seeStatusCode(200);
    }

    /**
     * GET staff/permissions/remove/{id}
     *
     * @group all
     * @group permissions
     */
    public function testStaffPermissionsRemoveIdGet()
    {
        //
    }
}
