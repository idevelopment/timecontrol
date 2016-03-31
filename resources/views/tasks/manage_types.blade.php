@extends('header')

@section('content')
<div class="page-header">
 <h2>Manage task types</h2>
</div>
 @if(Auth::user()->is('Administrator'))

<div class="well well-sm">
<div class="btn-group">
<button class="btn btn-sm btn-default" onclick="location.href='create';"><i class="fa fa-plus"></i> Add type</button>
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
 <th>Name</th>
 <th>Priority</th>
 <th>&nbsp;</th>
</tr>
</thead>
<tbody>
@foreach ($tasks as $task)
<tr>
 <td>{!! $task->name !!}</td>
 <td>{!! $task->priority !!}</td>
 <td>
     <!-- <a href=""><i class="fa fa-pencil"></i></a> -->
     <a href="{!! route('type.delete', ['id' => $task->id]) !!}"><i class="fa fa-times"></i></a>
 </td>
</tr>
@endforeach
</tbody>
</table>
</div>
</div>
@else
<div class="alert alert-danger">
  <p><span class="fa fa-times fa-lg"></span> {{Lang::get('aop.403')}}</p>
</div>
@endif
@endsection
