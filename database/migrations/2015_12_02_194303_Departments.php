<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class Departments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            Schema::create('departments', function(Blueprint $table)
            {
                $table->increments('id');
                $table->string('department_name');
                $table->string('department_manager');      
                $table->string('department_description');
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
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::drop('departments');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
