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
      <th>Employee</th>
     <th>Type</th>
     <th>From</th>
     <th>Untill</th>
     <th></th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>fdsf</td>
     <td>aa</td>
     <td>ee</td>
     <td>rr</td>
     <td><a href="#"><i class="fa fa-pencil fa-btn"></i></a></td>
   </tr>

   <tr>
     <td>fdsf</td>
     <td>aa</td>
     <td>ee</td>
     <td>rr</td>
     <td><a href="#"><i class="fa fa-pencil fa-btn"></i></a></td>
   </tr>

   <tr>
     <td>fdsf</td>
     <td>aa</td>
     <td>ee</td>
     <td>rr</td>
     <td><a href="#"><i class="fa fa-pencil fa-btn"></i></a></td>
   </tr>

   <tr>
     <td>fdsf</td>
     <td>aa</td>
     <td>ee</td>
     <td>rr</td>
     <td><a href="#"><i class="fa fa-pencil fa-btn"></i></a></td>
   </tr>
 </tbody>
</table>
@endsection
