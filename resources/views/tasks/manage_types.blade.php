@extends('header')

@section('content')
<div class="page-header">
 <h2>Manage task types</h2>
</div>
 @if(Auth::user()->is('Administrator'))

<div class="well well-sm">
<div class="btn-group">
<button class="btn btn-sm btn-default" data-toggle="modal" data-target="#create"><i class="fa fa-plus"></i> Add type</button>
</div>
</div>

<div class="modal" id="create" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Add new task type</h4>
      </div>
       <form class="form-horizontal" action="{{url('types/create')}}" method="post">
       {!! csrf_field() !!}
      <div class="modal-body">
         <div class="form-group">
         	<label class="col-sm-2 control-label" for="name">Name</label>
          <div class="col-sm-10">         	        	
         	<input type="text" name="name" id="name" class="form-control">
         	</div>
         </div>

         <div class="form-group">
         	<label class="col-sm-2 control-label" for="priority">Priority</label>
          <div class="col-sm-10">         	
         	<select name="priority"  class="form-control">
         	 <option value="1">Low</option>
         	 <option value="2">Medium</option>
         	 <option value="3">High</option>
         	 <option value="4">Urgent</option>
         	</select>
          </div>
         </div>         

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
      </form>
    </div>
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

@if (count($tasks))


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
<div class="alert alert-warning">
<h4>Warning</h4>
  <p>For the moment there are no types configured, please add them by using the button in the top menu</p>
</div>
@endif

@else
<div class="alert alert-danger">
  <p><span class="fa fa-times fa-lg"></span> {{Lang::get('aop.403')}}</p>
</div>
@endif

@endsection
