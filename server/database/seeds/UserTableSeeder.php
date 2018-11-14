<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        factory(\App\User::class,1)->create([
            'name' => 'Rossano',
            'email' => 'rossanorb@gmail.com',
            'password' => bcrypt('102030'),
            'remember_token' => str_random(10),
        ]);

        factory(\App\User::class,50)->create();

    }
}
