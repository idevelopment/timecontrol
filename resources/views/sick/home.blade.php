@extends('header')
@section('content')
<div class="page-header">
 <h2>{{Lang::get('tasks.sick_notification')}}</h2>
</div>

<div class="well well-sm">
 <div class="btn-group">
 <button class="btn btn-sm btn-primary" onclick="location.href='{{url('sick/register')}}';"><i class="fa fa-plus"></i> {{Lang::get('tasks.sick_notification_register')}}</button>
 </div>
 </div>
 @if (Session::has('message'))
    <div class="alert alert-success">
 <button type="button" class="close" data-dismiss="alert" aria-label="Close">
   <span aria-hidden="true">&times;</span>
 </button>
    {{ Session::get('message') }}</div>
 @endif

 @if (Session::has('error'))
    <div class="alert alert-warning">
 <button type="button" class="close" data-dismiss="alert" aria-label="Close">
   <span aria-hidden="true">&times;</span>
 </button>
    {{ Session::get('error') }}</div>
 @endif

<div class="panel panel-default">
  <div class="panel-body">
 <table class="table table-striped">
 <thead>
   <tr>
     <th>{{Lang::get('tasks.sick_notification_employee')}}</th>
     <th>{{Lang::get('tasks.sick_notification_type')}}</th>
     <th>{{Lang::get('tasks.sick_notification_start')}}</th>
     <th>{{Lang::get('tasks.sick_notification_stop')}}</th>
     <th></th>
   </tr>
 </thead>
 <tbody>
   @foreach($adata as $data)
   <tr>
     <td>{{$data->user->fname}} {{$data->user->name}}</td>
     <td>{{$data->type}}</td>
     <td>{{$data->start_date}}</td>
     <td>{{$data->end_date}}</td>
     <td><a href="{{url('absenteeism')}}/display/{{$data->absenteeism_id}}"><i class="fa fa-pencil fa-btn"></i></a></td>
   </tr>
   @endforeach
 </tbody>
</table>
</div>
</div>
@endsection
