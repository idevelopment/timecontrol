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
        'type' => $faker->numberBetween(0, 200),
        'phone' => $faker->phoneNumber,
        'company' => $faker->company,
        'department' => $faker->word,
        'team' => $faker->word,
        'address' => $faker->address,
        'postal_code' => $faker->postcode,
        'city' => $faker->city,
        'image' => 'image.jpg',
        'country' => $faker->country,
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

$factory->define(App\Departments::class, function (Faker\Generator $faker) {
    return [
        'department_name' => $faker->name,
        'department_manager' => $faker->name,
        'department_description' => $faker->text,
    ];
});

$factory->define(App\Sick::class, function (Faker\Generator $faker) {
    return [
        'absenteeism_id' => '100',
        'description' => $faker->text,
        'type' => $faker->word,
        'start_date' => $faker->date('Y-m-d', 'now'),
        'end_date' => $faker->date('Y-m-d', 'now'),
        'user_id' => '1',
        'description' => $faker->text
    ];
});

$factory->define(App\Permission::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->word,
        'entity_id' => $faker->numberBetween(),
        'entity_type' => $faker->word,
    ];
});

$factory->define(App\Tasks::class, function (Faker\Generator $faker) {
    return [ 
        'name' => $faker->word,
        'priority' => $faker->word
    ];
});
