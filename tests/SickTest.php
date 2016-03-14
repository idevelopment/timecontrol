<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class SickTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions, WithoutMiddleware;
    /**
     * GET sick
     *
     * @group all
     * @group sick
     */
    public function testSickGet()
    {
        $user = factory(App\User::class)->create();
        $this->actingAs($user)->visit('sick')->seeStatusCode(200);
    }

    /**
     * GET sick/display/{id}
     *
     * @group all
     * @group sick
     */
    public function testSickDisplayIdGet()
    {
        $user = factory(App\User::class)->create();
        $sick = factory(App\Sick::class)->create();

        $route = $this->actingAs($user);
        $route->visit('sick/display/' . $sick->id);
        $route->seeStatusCode(200);
    }

    /**
     * GET sick/register
     *
     * @group all
     */
    public function testSickRegisterGet()
    {
        $user = factory(App\User::class)->create();
        $this->actingAs($user)->visit('sick/register')->seeStatusCode('200');
    }

    /**
     * POST sick/register
     *
     * @group all
     */
    public function testSickRegisterPost()
    {
        $user = factory(App\User::class)->create();

        $input['type']        = 'type';
        $input['start_date']  = '10-10-2014';
        $input['stop_date']   = '12-10-2015';
        $input['employee']    = $user->id;
        $input['description'] = 'Description';

        $route = $this->actingAs($user);
        $route->post('sick/register', $input);
        $route->seeStatusCode(500); // Bug
    }
}
