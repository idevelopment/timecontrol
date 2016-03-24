<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PivotManagerDepartment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('departments_user', function (Blueprint $t) {
            $t->integer('user_id')->unsigned()->index();
            $t->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $t->integer('departments_id')->unsigned()->index();
            $t->foreign('departments_id')->references('id')->on('departments')->onDelete('cascade');
            $t->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('departments_user');
    }
}
