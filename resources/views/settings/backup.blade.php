@extends('header')

@section('content')
<div class="page-header">
 <h2>Backup settings</h2>
</div>

<div class="col-md-12">
{{ $include }}
 <div class='block block-size-medium'>
 <div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">
  <form action="" method="post" class="form-horizontal">
   <div class="form-group">
<label for="database" class="col-sm-2 control-label">Database connection</label>
<div class="col-sm-6">
 <select name="database" id="database" class="form-control">
  <option value="mysql">Mysql</option> 
 </select>
<span id="helpBlock" class="help-block">The name of the connections to the databases that should be part of the backup.</span>
 </div>
 </div>

 <div class="form-group">
<label for="include" class="col-sm-2 control-label">include directories</label>
 <div class="col-sm-6">
 <textarea name="include" id="include" class="form-control">{{ $include }}</textarea>
<span id="helpBlock" class="help-block">These directories or files will be excluded from the backup.</span> 
 </div>
 </div>

 <div class="form-group">
<label for="exclude" class="col-sm-2 control-label">include directories</label>
<div class="col-sm-6">
 <textarea name="exclude" id="exclude" class="form-control">{{ $exclude }}</textarea>
<span id="helpBlock" class="help-block">These directories or files will be excluded from the backup.</span>                   
 </div>
 </div>

 <hr>

    <div class="form-group">
<label for="keepAllBackupsForDays" class="col-sm-2 control-label">Store all backups</label>
<div class="col-sm-6">
 <input type="number" name="keepAllBackupsForDays" value="{{ $keepAllBackupsForDays }}" id="keepAllBackupsForDays" class="form-control">
<span id="helpBlock" class="help-block">The amount of days that all daily backups must be kept</span>
 </div>
 </div>

</form>

  </div>
  </div>
 </div>
</div>
</div>
@endsection