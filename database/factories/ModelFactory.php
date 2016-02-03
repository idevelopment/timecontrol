<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
      'fname' => $faker->firstName,
      'name' => $faker->lastName,
      'email' => $faker->email,
      'password' => bcrypt("demo123456"),
      'remember_token' => str_random(10),
    ];
});
