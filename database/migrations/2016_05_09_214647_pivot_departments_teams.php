<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PivotDepartmentsTeams extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('departments_teams', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('teams_id')->unsigned()->index();
            $table->foreign('teams_id')->references('id')->on('teams')->onDelete('cascade');

            $table->integer('departments_id')->unsigned()->index();
            $table->foreign('departments_id')->references('id')->on('departments')->onDelete('cascade');

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
        //
    }
}
