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
         $table->increments('absenteeism_id');
         $table->string('type', 100);
         $table->date('start_date');
         $table->date('end_date');
         $table->integer('user_id');
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
        Schema::drop("absenteeism");
    }
}
