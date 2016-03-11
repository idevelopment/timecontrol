@extends('header')

@section('content')
<div class="page-header">
 <h2>Manage staff</h2>
</div>
 @if(Auth::user()->is('Administrator'))

<div class="well well-sm">
<div class="btn-group">
<button class="btn btn-sm btn-default" onclick="location.href='staff/create';"><i class="fa fa-plus"></i> Add employee</button>
<!-- Button trigger modal -->
<button type="button" class="btn btn-sm btn-default" data-toggle="modal" data-target="#searchEmployee">
<i class="fa fa-search"></i> Search employee</button>

<!-- Modal -->
<div class="modal fade" id="searchEmployee" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Search employee</h4>
      </div>
      <div class="modal-body">
      <form action="" method="POST" class="form-horizontal">

        <div class="form-group">
         <label for="first_name" class="form-label col-md-3">First name</label>
         <div class="col-md-9">
         	<input type="text" id="first_name" name="first_name" class="form-control">
         </div>
        </div>

        <div class="form-group">
         <label for="name" class="form-label col-md-3">Name</label>
         <div class="col-md-9">
         	<input type="text" id="name" name="name" class="form-control">
         </div>
      </div>

        <div class="form-group">
         <label for="address" class="form-label col-md-3">Address</label>
         <div class="col-md-9">
         	<input type="text" id="address" name="address" class="form-control">
         </div>
      </div>

       <div class="form-group">
         <label for="email" class="form-label col-md-3">Email</label>
         <div class="col-md-9">
         	<input type="email" id="email" name="email" class="form-control">
         </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-default">Save changes</button>
      </div>
      </form>
      </div>
    </div>
  </div>
</div>

<button class="btn btn-sm btn-danger">Disable account</button>
</div>
</div>

<div class="clearfix">&nbsp;</div>
@if (Session::has('message'))
   <div class="alert alert-success">
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
   {{ Session::get('message') }}</div>
@endif

<div class="panel panel-default">
<div class="panel-body">
<table class="table table-striped">
<thead>
<tr>
 <th>#</th>
 <th>Name</th>
 <th>Department</th>
 <th>Created</th>
 <th>Email</th>
</tr>
</thead>
<tbody>
@foreach ($users as $user_item)
<tr>
 <td><input name="id" type="checkbox" value="{{ $user_item->id }}"></td>
 <td>{{ $user_item->name }} {{ $user_item->fname }}</td>
 <td>none</td>
 <td>{{$user_item->created_at}}</td>
 <td><a href="mailto:{{ $user_item->email }}">{{ $user_item->email }}</a></td>
 <td><a href="{{ url('staff/edit') }}/{{ $user_item->id }}"><i class="fa fa-pencil"></i> <a href="{{ url('staff/remove') }}/{{ $user_item->id }}"><i class="fa fa-times"></i></a></td>
</tr>
@endforeach
</tbody>
</table>
 {!! $users->render() !!}
</div>
</div>
@else
<div class="alert alert-danger">
  <p><span class="fa fa-times fa-lg"></span> {{Lang::get('aop.403')}}</p>
</div>
@endif
@endsection
