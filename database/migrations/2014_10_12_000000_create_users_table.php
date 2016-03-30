<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     	{
     		Schema::create('users', function(Blueprint $table)
     		{
     			$table->increments('id');
     			$table->string('name');
     			$table->string('fname');
     			$table->string('address');
     			$table->string('postal_code');
     			$table->string('city');
     			$table->string('country');
     			$table->string('email')->unique();
     			$table->string('password', 60);
     			$table->string('type');
				$table->string('image');
          $table->integer('phone');
          $table->string('company');
          $table->string('department');
          $table->string('team');
     			$table->rememberToken();
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
        Schema::drop('users');
		DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
