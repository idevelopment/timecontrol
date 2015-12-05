@extends('header')

@section('content')
 <div class="page-header">
  <h2>User access roles</h2>
 </div>

<div class="well well-sm">
<div class="btn-group">
<button class="btn btn-sm btn-primary" onclick="location.href='policies/create';"><i class="fa fa-plus"></i> Add Role</button>
<button class="btn btn-sm btn-danger">Disable account</button>
</div>
</div>

<table class="table table-striped">
 <thead>
  <th>Role</th>
  <th>Created</th>
  <th>Updated at</th>
 </thead>
 <tbody>
 @foreach($roles as $role_item)
  <tr>
   <td>{{ $role_item->name }}</td>
   <td>{{ $role_item->created_at }}</td>   
   <td>{{ $role_item->updated_at }}</td>   
  </tr>
  @endforeach
 </tbody>
@endsection