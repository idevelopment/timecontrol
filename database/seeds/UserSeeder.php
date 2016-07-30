<?php
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\User as User;

class UserSeeder extends Seeder
{


    public function run()
    {
        DB::table('users')->delete();
        
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


        Bouncer::assign('Administrator')->to($user);
        Bouncer::assign('Manager')->to($user);

    }
}
