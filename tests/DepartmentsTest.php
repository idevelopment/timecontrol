<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DepartmentsTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * GET staff/departments
     *
     * @group all
     * @group departments
     */
    public function testStaffDepartments()
    {
        $user = factory(App\User::class)->create();
        $this->actingAs($user)->visit('staff/departments')->seeStatusCode(200);
    }

    /**
     * GET staff/departments/create
     *
     * @group all
     * @group departments
     */
    public function testStaffDepartmentsCreate()
    {
        $user = factory(App\User::class)->create();
        $this->actingAs($user)->visit('staff/departments/create')->seeStatusCode(200);
    }

    /**
     * POST staff/departments/docreate
     *
     * @group all
     * @group departments
     */
    public function testStaffDepartmentsDoCreate()
    {
        //
    }
}
