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
 * Testing out the functionality from the departments controller.
 */
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
        $this->withoutMiddleware();

        $user = factory(App\User::class)->create();

        $data['department_name']        = 'test department';
        $data['department_manager']     = 'Jhon Doe';
        $data['department_description'] = 'test department derpartment';

        $route = $this->actingAs($user);
        $route->post('staff/departments/docreate', $data);
        $route->seeStatusCode(500); // TODO: Bug 
        $route->seeInDatabase('departments', $data);
    }
}
