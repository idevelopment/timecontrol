<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{

    public function run()
    {
        Model::unguard();
        $this->call(CountrySeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);

        // Add demo users to play with
        factory(App\User::class, 20)->create()->each(function($user) { $user->assignRole('Agent');});
        factory(App\Teams::class, 20)->create();
        factory(App\Departments::class, 20)->create();
        factory(App\Sick::class, 20)->create();               
        Model::reguard();

    }
}
