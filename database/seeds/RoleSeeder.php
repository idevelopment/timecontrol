<?php
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder {
/**
   * Run the database seeds.
   *
   * @return void
*/
    public function run()
    {
      DB::table('roles')->insert([['name' => 'Administrator', 'created_at' => date('Y-m-d H:i:s') ],
                   ['name' => 'Agent', 'created_at' => date('Y-m-d H:i:s')],
                   ['name' => 'Department manager', 'created_at' => date('Y-m-d H:i:s')],
                   ['name' => 'Manager', 'created_at' => date('Y-m-d H:i:s')]
                    ]);

      DB::table('user_has_roles')->insert([['role_id' => '1', 'user_id' => '1']]);


    }
}
