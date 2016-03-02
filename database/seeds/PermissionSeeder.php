<?php
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder {
/**
   * Run the database seeds.
   *
   * @return void
*/
    public function run()
    {
      DB::table('permissions')->insert([['name' => 'manage_users', 'description' => 'manage user accounts', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s') ],
                   ['name' => 'manage_break', 'description' => 'manage break queue', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
                   ['name' => 'manage_departments', 'description' => 'manage departments', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
                   ['name' => 'manage_teams','description' => 'manage teams', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')]
                    ]);
    }
}
