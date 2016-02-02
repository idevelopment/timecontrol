<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RegisterAbsenteeism extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('absenteeism', function (Blueprint $table) {
         $table->string('type', 100);
         $table->dateTime('start_date');
         $table->dateTime('end_date');
         $table->integer('requester');
         $table->text('description');
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
        Schema::drop("absenteeism")
    }
}
