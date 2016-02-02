@extends('header')
@section('content')
<div class="page-header">
 <h2>Absenteeism</h2>
</div>

<div class="well well-sm">
 <div class="btn-group">
 <button class="btn btn-sm btn-primary" onclick="location.href='{{url('absenteeism/register')}}';"><i class="fa fa-plus"></i> Register</button>
 </div>
 </div>

 <table class="table table-striped">
 <thead>
   <tr>
     <th>Employee</th>
     <th>Type</th>
     <th>From</th>
     <th>Untill</th>
     <th></th>
   </tr>
 </thead>
 <tbody>
   @foreach($adata as $data)
   <tr>
     <td>{{$data->user->fname}} {{$data->user->name}}</td>
     <td>{{$data->user_id}}</td>
     <td>{{$data->type}}</td>
     <td>{{$data->start_date}}</td>
     <td>{{$data->end_date}}</td>
     <td><a href="{{url('absenteeism')}}/display/{{$data->absenteeism_id}}"><i class="fa fa-pencil fa-btn"></i></a></td>
   </tr>
   @endforeach
 </tbody>
</table>
@endsection
