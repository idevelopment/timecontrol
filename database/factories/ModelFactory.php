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

$factory->define(App\Teams::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->company,
        'manager' => '1',
        'description' => $faker->text,
    ];
});

$factory->define(App\Departments, function (Faker\Generator $faker) {
    return [
        'department_name' => $faker->name,
        'department_manager' => $faker->name,
        'department_description' => $faker->text,
    ];
});

$factory->define(App\Sick, function (Faker\Generator $faker) {
    return [
        'absenteeism_id' => $faker->numberBetween(0, 100),
        'type' => $faker->word,
        'start_date' => $faker->date('2015-10-10', now()),
        'end_date' => $faker->date('2015-10-10', now()),
        'user_id' => $faker->numberBetween(0, 100),
        'description' => $faker->text
    ];
});
