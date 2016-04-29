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
 * Test the types functionality test.
 */
class TypesTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * GET: types
     *
     * @group all
     * @group types
     */
    public function testTypesGet()
    {
        $user = factory(App\User::class)->create();

        $route = $this->actingAs($user);
        $route->visit('types');
        $route->seeStatusCode(200);
    }

    /**
     * GET: types/create
     *
     * @group all
     * @group types
     */
    public function testTypesCreateGet()
    {
        $user = factory(App\User::class)->create();

        $route = $this->actingAs($user);
        $route->visit('types/create');
        $route->seeStatusCode(200);
    }

    /**
     * POST: types/create
     *
     * @group all
     * @group types
     */
    public function testTypesCreatePost()
    {
        $this->withoutMiddleware();
        
        $user = factory(App\User::class)->create();

        $data['name']     = 'test';
        $data['priority'] = 'low';

        $route = $this->actingAs($user);
        $route->post('types/create', $data);
        $route->seeStatusCode(302);
        $route->seeInDatabase('tasks', $data);
        $route->assertSessionHas('message', 'The task is successfully added.');
    }

    /**
     * GET: types/delete/{id}
     *
     * @group all
     * @group types
     */
    public function testTypesDelete()
    {
        $users = factory(App\User::class)->create();
        $tasks = factory(App\Tasks::class)->create();

        $route = $this->actingAs($users);
        $route->visit('types/delete/' . $tasks->id);
        $route->seeStatusCode(200);
    }
}
