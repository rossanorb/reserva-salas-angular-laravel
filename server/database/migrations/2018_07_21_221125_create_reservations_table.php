<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('users_id')->unsigned();
            $table->dateTime('date_in');
            $table->dateTime('date_out');
            $table->foreign('users_id')->references('id')->on('users');
            $table->integer('rooms_id')->unsigned();
            $table->foreign('rooms_id')->references('id')->on('rooms');            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
