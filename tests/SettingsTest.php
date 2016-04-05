<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Config;

class SettingsTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * GET: settings/backup
     *
     * @group all
     * @group settings
     */
    public function testSettingsBackupGet()
    {
        $user = factory(App\User::class)->create();

        $route = $this->actingAs($user);
        $route->visit('settings/backup');
        $route->seeStatusCode(200);
    }

    /**
     * GET: settings/general
     *
     * @group all
     * @group settings
     */
    public function testSettingsGeneralGet()
    {
        $user = factory(App\User::class)->create();

        $route = $this->actingAs($user);
        $route->visit('settings/general');
        $route->seeStatusCode(200);
    }

    /**
     * POST settings/general
     *
     * Note: this will fuck up the timecontrol config
     * I know this is a horrible test.
     *
     * @group all
     * @group settings
     */
    public function testSettingsGeneralPost()
    {
        $this->withoutMiddleware();

        $user = factory(App\User::class)->create();

        $config['title'] = 'Application title';
        $config['email'] = 'Application email';
        $config['date']  = 'Application date';
        $config['time']  = 'Application time';

        $route = $this->actingAs($user);
        $route->post('settings/general', $config);

        // Wait and sync
        sleep(3);

        // Check config vars.
        $this->assertEquals(Config::get('timecontrol.title'), $config['title']);
        $this->assertEquals(Config::get('timecontrol.email'), $config['email']);
        $this->assertEquals(Config::get('timecontrol.date'), $config['date']);
        $this->assertEquals(Config::get('timecontrol.time'), $config['time']);
    }
}
