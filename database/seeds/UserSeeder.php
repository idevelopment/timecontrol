<?php
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\User as User;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
class UserSeeder extends Seeder {


    public function run()
    {
      $user = User::create(array('fname' => 'Admin',
      'name' => 'User',
      'address' => 'Foobar street 4',
      'city' => 'Brussels',
      'country' => 'Belgium',
      'email' => 'admin@timecontrol.be',
      'password' => bcrypt("demo123456"),
      'department' => '0',
      'team' => '0'
    ));
      $user->assignRole('Administrator');
    }
}
