<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PermissionsTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * Test bouncer seeder
     *
     * @group all
     * @group permissions
     */
    public function testBouncerSeeder()
    {
        // TODO: Check abilities table in database.
        
        \Illuminate\Support\Facades\Artisan::call('bouncer:seed');

        $this->seeInDatabase('roles', [
            'name' => 'Administrator',
            'name' => 'Manager',
        ]);
    }

    /**
     * GET staff/permissions
     *
     * @group all
     * @group permissions
     */
    public function testStaffPermissions()
    {
        $user = factory(App\User::class)->create();
        $this->actingAs($user)->visit('staff/permissions')->seeStatusCode(200);
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
        $user = factory(App\User::class)->create();
        $perm = factory(App\Permission::class)->create();

        $this->actingAs($user)->visit('staff/permissions/edit/' . $perm->id)->seeStatusCode(200);
    }

    /**
     * GET staff/permissions/remove/{id}
     *
     * @group all
     * @group permissions
     */
    public function testStaffPermissionsRemoveIdGet()
    {
        $user = factory(App\User::class)->create();
        $perm = factory(App\Permission::class)->create();

        $route = $this->actingAs($user);
        $route->visit('staff/permissions/remove/' . $perm->id);
        $route->seeStatusCode(200);
    }
}
