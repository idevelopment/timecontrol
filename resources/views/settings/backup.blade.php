@extends('header')

@section('content')
<div class="page-header">
 <h2>Backup settings</h2>
</div>

<div class="col-md-12">

 <div class='block block-size-medium'>
 <div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">
  <form action="" method="post" class="form-horizontal">
   <div class="form-group">
<label for="database" class="col-sm-2 control-label">{{ Lang::get('settings.backup_db') }}</label>
<div class="col-sm-6">
 <select name="database" id="database" class="form-control">
  <option value="mysql">Mysql</option> 
 </select>
<span id="helpBlock" class="help-block">{{Lang::get('settings.backup_db_helper')}}</span>
 </div>
 </div>

 <div class="form-group">
<label for="include" class="col-sm-2 control-label">{{ Lang::get('settings.backup_include') }}</label>
 <div class="col-sm-6">
 <textarea name="include" id="include" rows="5" class="form-control">
@foreach($include as $include_items)
{{$include_items}}
   @endforeach
 </textarea>
<span id="helpBlock" class="help-block">{{ Lang::get('settings.backup_include_helper') }}</span> 
 </div>
 </div>

 <div class="form-group">
<label for="exclude" class="col-sm-2 control-label">{{ Lang::get('settings.backup_exclude') }}</label>
<div class="col-sm-6">
 <textarea name="exclude" id="exclude" rows="5" class="form-control">
@foreach($exclude as $exclude_items)
   {{$exclude_items}}
   @endforeach   
 </textarea>
<span id="helpBlock" class="help-block">{{ Lang::get('settings.backup_exclude_helper') }}</span>                   
 </div>
 </div>

 <hr>

    <div class="form-group">
<label for="keepAllBackupsForDays" class="col-sm-2 control-label">Store all backups</label>
<div class="col-sm-6">
 <input type="number" name="keepAllBackupsForDays" value="{{ $keepAllBackupsForDays }}" id="keepAllBackupsForDays" class="form-control">
<span id="helpBlock" class="help-block">{{ Lang::get('settings.backup_store_all_helper') }}</span>
 </div>
 </div>

  <div class="row">
   <div class="col-md-12">
    <div class="form-group">
      <button type="submit" class="btn btn-primary">{{ Lang::get('app.save') }}</button>
      <button type="reset" class="btn btn-danger">{{ Lang::get('app.cancel') }}</button>
    </div> 
   </div>
   </div>

</form>

  </div>
  </div>
 </div>
</div>
</div>
@endsection