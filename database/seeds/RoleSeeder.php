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
      Role::create(['name' => 'Administrator']);
    }
}
