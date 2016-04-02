@extends('header')

@section('content')
<div class="page-header">
 <h2>Edit role</h2>
</div>

<div class="panel panel-default">
<div class="panel-body">
<form action="{{ url('staff/policies/edit/$id') }}" class="form-horizontal" method="POST">

{!! csrf_field() !!}

 <div class="form-group">
  <label for="permission_name" class="form-label col-md-2">Permission name <span class="text-danger">*</span></label>
  <div class="col-md-6">
  <input type="text" id="permission_name" name="permission_name" value="{{ $permission['name'] }}" class="form-control">
 </div>
 </div>

<div class="form-group">
<div class="col-md-offset-2 col-md-6">
 <button type="submit" class="btn btn-primary">Submit</button>
 <button type="reset" class="btn btn-primary">Cancel</button>
</div>

</form>

</div>
@endsection
