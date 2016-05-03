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

@if (Session::has('message'))
<div class="alert alert-success">
 <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
 </button>
   {{ Session::get('message') }}
</div>
@endif

<div class="panel panel-default">
<div class="panel-body">
<table class="table table-striped">
 <thead>
  <th>Role</th>
  <th>Created</th>
  <th>Updated at</th>
  <th class="col-md-1"></th>
 </thead>
 <tbody>
 @foreach($roles as $role_item)
  <tr>
    <td>{{ $role_item->name }}</td>
    <td>{{ $role_item->created_at->format('Y-m-d') }}</td>   
    <td>{{ $role_item->updated_at }}</td>
    <td>
       <a class="label label-success" href="{{ url('staff/policies/edit', $role_item->id)}}"><i class="fa fa-search"></i></a>
       <a class="label label-danger" href="{{ url('staff/policies/remove', $role_item->id)}}"><i class="fa fa-times"></i></a>
    </td>
   </tr>
   @endforeach
  </tbody>
  </table>
 </div>
 </div>
@endsection
