<?php

use Faker\Generator as Faker;

$factory->define(App\Reservation::class, function (Faker $faker) {
    return [
        'rooms_id' => 1,
        'date_in' => '2018-11-04 18:00:00',
        'date_out' => '2018-11-04 18:20:00'
    ];
});
