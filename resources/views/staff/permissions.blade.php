@extends('header')

@section('content')
<div class="page-header">
 <h2>Permissions</h2>
</div>

<div class="well well-sm">
<div class="btn-group">
<button class="btn btn-sm btn-primary" onclick="location.href='permissions/create';"><i class="fa fa-plus"></i> Add permission</button>
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
 	<th>Permission</th>
 	<th>Created</th>
  <th>Updated</th>
  <th></th>
 </thead>

<tbody>
@foreach($permissions as $permission_item)
	<tr>
	 <td>{{ $permission_item->name }}</td>
   <td>{{ $permission_item->created_at }}</td>
   <td>{{ $permission_item->updated_at }}</td>
   <td>
       <a class="label label-success" href="{{ url('staff/permissions/edit') }}/{{ $permission_item->id }}"><i class="fa fa-pencil"></i></a>
       <a class="label label-danger" href="{{ url('staff/permissions/remove') }}/{{ $permission_item->id }}"><i class="fa fa-times"></i></a>
   </td>
 </tr>
 @endforeach
</tbody>
 </table>
</div>
</div>
@endsection
