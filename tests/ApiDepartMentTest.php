à<?php

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
class ApiDepartMentTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * GET: api/v1/departments
     *
     * @group all
     * @group api
     */
    public function testDepartmentsAllGet()
    {
        $department = factory(App\Departments::class)->create();
        $user       = factory(App\User::class)->create();

        $json['id']          = $department->id;
        $json['name']        = $department->department_name;
        $json['description'] = $department->department_description;

        $this->visit('api/v1/departments')
            ->seeStatusCode(200)
            ->seeJson($json);
    }

    /**
     * GET: api/v1/departments/{department id}
     *
     * @group all
     * @group api
     */
    public function testDepartmentSpecficget()
    {
        $department = factory(App\Departments::class)->create();
        $user       = factory(App\User::class)->create();

        $json['id']          = $department->id;
        $json['name']        = $department->department_name;
        $json['description'] = $department->department_description;

        $this->visit('api/v1/departments/' . $department->id)
            ->seeStatusCode(200)
            ->seeJson($json);

    }

    /**
     * POST: api/v1/departments
     *
     * @group all
     * @group api
     */
    public function testDepartmentCreate()
    {
        $department = factory(App\Departments::class)->create();
        $user       = factory(App\User::class)->create();

        $oldDb['department_manager']     = $department->department_manager;
        $oldDb['department_name']        = $department->department_name;
        $oldDb['department_description'] = $department->department_description;

        $input['department_manager']     = 'Example manager';
        $input['department_name']        = 'Department name';
        $input['department_description'] = 'Department description';

        $error['department_manager']     = '';
        $error['department_name']        = '';
        $error['department_description'] = '';

        // Without validation errors
        $this->seeInDatabase('departments', $oldDb)
            ->post('api/v1/departments', $input)
            ->seeInDatabase('departments', $input)
            ->seeStatusCode(201)
            ->seeJson([
                'department_name'        => $input['department_name'],
                'department_description' => $input['department_description']
            ]);

        // With validation errors
        $this->post('api/v1/departments', $error)
            ->notSeeInDatabase('departments', $error)
            ->seeJsonEquals([
                'department_manager' => ['The department manager field is required.'],
                'department_name'    => ['The department name field is required.']
            ]);
    }

    /**
     * PUT: api/v1/departments/{department id}
     * PATCH: api/v1/departments/{department id}
     *
     * @group all
     * @group api
     */
    public function testDepartmentUpdate()
    {
        $department = factory(App\Departments::class)->create();
        $user       = factory(App\User::class)->create();

        $oldDb['department_manager']     = $department->department_manager;
        $oldDb['department_name']        = $department->department_name;
        $oldDb['department_description'] = $department->department_description;

        $input['department_manager']     = 'Example manager';
        $input['department_name']        = 'Department name';
        $input['department_description'] = 'Department description';

        $error['department_manager']     = '';
        $error['department_name']        = '';
        $error['department_description'] = '';

        // Without validation errors
        $this->seeInDatabase('departments', $oldDb)
            ->put('api/v1/departments', $input)
            ->seeInDatabase('departments', $input)
            ->seeStatusCode(201)
            ->seeJson([
                'department_name'        => $input['department_name'],
                'department_description' => $input['department_description']
            ]);

        // With validation errors
        $this->put('api/v1/departments/' . $department->id, $error)
            ->notSeeInDatabase('departments', $error)
            ->seeJsonEquals([
                'department_manager' => ['The department manager field is required.'],
                'department_name'    => ['The department name field is required.']
            ]);
    }

    /**
     * DELETE: api/v1/departments/{department id}
     *
     * @group all
     * @group api
     */
    public function testDepartmentDelete()
    {

    }

}
