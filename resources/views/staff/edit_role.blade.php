@extends('header')

@section('content')
 <div class="page-header">
  <h2>Change role</h2>
 </div>

<div class="well well-sm">
<button class="btn btn-sm btn-primary" onclick="location.href='policies/create';">Save changes</button>
<button class="btn btn-sm btn-danger">Cancel</button>
</div

<form action="{{ url('staff/policies/create') }}" method="POST">

<div class="panel panel-default">
<div class="panel-heading">General information</div>
<div class="panel-body">
{!! csrf_field() !!}

<div class="form-group">
 <label for="role_name" class="form-label">Role name <span class="text-danger">*</span></label>
 <input type="text" id="role_name" name="role_name" class="form-control">
</div>


<div class="form-group">
 <label for="role_description" class="form-label">Description</label>
 <textarea id="role_description" name="role_description" rows="10" class="form-control"></textarea>
</div>

</div>
</div>

<div class="panel panel-default">
<div class="panel-heading">Permissions</div>

 <div class="panel-body">
  @foreach($permissions as $permission_item)
  <div class="form-group">
   <div class="checkbox">
    <label for="{{ $permission_item->id }}">
      <input type="checkbox" name="permissions[]" id="{{ $permission_item->id }}" value="{{ $permission_item->name }}"> {{ $permission_item->name }}
    </label>
   </div>
  </div>
  @endforeach
  </div>
 </div>

</div>
</form>
@endsection