@extends('header')
@section('content')
<div class="page-header">
 <h2>{{Lang::get('tasks.absenteeism')}}</h2>
</div>

<div class="well well-sm">
 <div class="btn-group">
 <button class="btn btn-sm btn-primary" onclick="location.href='{{url('absenteeism/register')}}';"><i class="fa fa-plus"></i> {{Lang::get('tasks.absenteeism_register')}}</button>
 </div>
 </div>
<div class="panel panel-default">
  <div class="panel-body">
 <table class="table table-striped">
 <thead>
   <tr>
     <th>{{Lang::get('tasks.absenteeism_employee')}}</th>
     <th>{{Lang::get('tasks.absenteeism_type')}}</th>
     <th>{{Lang::get('tasks.absenteeism_start')}}</th>
     <th>{{Lang::get('tasks.absenteeism_stop')}}</th>
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
