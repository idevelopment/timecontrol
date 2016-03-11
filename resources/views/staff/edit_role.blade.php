@extends('header')

@section('content')
 <div class="page-header">
  <h2>Change role</h2>
 </div>

<div class="well well-sm">
<button class="btn btn-sm btn-primary" onclick="location.href='policies/create';">Save changes</button>
<button class="btn btn-sm btn-danger">Cancel</button>
</div>

<form action="{{ url('staff/policies/create') }}" method="POST" class="form-horizontal">

<div class="panel panel-default">
<div class="panel-heading">General information</div>
<div class="panel-body">
{!! csrf_field() !!}

<div class="form-group">
 <label for="role_name" class="col-md-2 control-label">Role name <span class="text-danger">*</span></label>
 <div class="col-md-4">
 <input type="text" id="role_name" name="role_name" class="form-control">
</div>
</div>

<div class="form-group">

<label for="permissions" class="col-md-2 control-label">Permissions <span class="text-danger">*</span></label>
 <div class="col-md-4">
  @foreach($permissions as $permission_item)
   <div class="checkbox">
    <label for="{{ $permission_item->id }}">
      <input type="checkbox" name="permissions[]" id="{{ $permission_item->id }}" value="{{ $permission_item->name }}"> {{ $permission_item->name }}
    </label>
   </div>
  @endforeach
</div>
</div>
</div>

</div>
</form>
@endsection
