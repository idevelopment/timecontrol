<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

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
        //
    }
}
