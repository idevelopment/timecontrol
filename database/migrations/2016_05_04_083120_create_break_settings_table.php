<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBreakSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('break_settings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('department_id');
            $table->integer('break_slots');
            $table->integer('max_break_time');
            $table->integer('max_queue');
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
        Schema::drop('break_settings');
    }
}
