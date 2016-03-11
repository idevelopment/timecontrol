<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Bouncer;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Bouncer::seeder(function () {
            Bouncer::allow('Agent');

            Bouncer::allow('Administrator')
                ->to(['manage_users', 'manage_break', 'manage_departments', 'manage_teams']);

            Bouncer::allow('Manager')
                ->to(['manager_users']);

            Bouncer::allow('Department_Manager');
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
