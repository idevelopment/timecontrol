<?php
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\User as User;
class UserTableSeeder extends Seeder {
/**
   * Run the database seeds.
   *
   * @return void
*/
    public function run()
    {
      User::create(['fname' => 'Admin','name' => 'User', 'address' => 'Foobar street 4', 'city' => 'Brussels', 'country' => 'Belgium',  'email' => 'admin@timecontrol.be', 'password' => bcrypt("demo123456"), 'department' => '0', 'team' => '0' ]);
    }
}
