<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HomeTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * GET /
     *
     * @group all
     * @group home
     */
    public function testHomeGet()
    {
        $user = factory(App\User::class)->make();
        $this->actingAs($user)->visit('/')->seeStatusCode(200);
    }

    /**
     * GET /home
     *
     * @group all
     * @group home
     */
    public function testHomeLoginGet()
    {
        $user = factory(App\User::class)->make();
        $this->actingAs($user)->visit('home')->seeStatusCode(200);
    }
}
