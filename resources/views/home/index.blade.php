@extends('header')

@section('content')
<div class="page-header">
 <h2>Dashboard</h2>
</div>

<div class="row">
 <div class="col-md-12">
  <div class="pull-right">
   <button class="btn btn-primary">Add tablet</button>
   <button class="btn btn-primary">Add widget</button>
  </div>
  </div>
 </div>

<div class="clearfix">&nbsp;</div>

<div class="col-lg-6">
 <div class='block block-size-medium'>
<div class='block-heading'>
<div class='main-text'>Tasks requests</div>
</div>

 <div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">
  <table id="example4" class="table table-striped table-condensed">
  <thead>
    <tr>
     <th class="col-md-3">Created</th>
     <th class="col-md-2">Type</th>
     <th class="">Assigned</th>
     <th>Task starts</th>
     <th class="col-md-2">Status</th>
    </tr>
  </thead>
  <tbody>
  <tr>
   <td><a href="#">30/11/2015 09:00 AM</a></td>
   <td><a href="#">Call back</a></td>
   <td><a href="#">Hermans Glenn</a></td>
   <td><a href="#">10:00 AM</a></td>
   <td><span class="label label-primary">Pending input</span></td>
  </tr>

  <tr>
   <td><a href="#">30/11/2015 09:00 AM</a></td>
   <td><a href="#">Call back</a></td>
   <td><a href="#">Hermans Glenn</a></td>
   <td><a href="#">10:00 AM</a></td>
   <td><span class="label label-danger">Rejected</span></td>
  </tr>

  </tbody>
  </table>
   </div>
   </div>
  </div>
  </div>
 </div>

 <div class="col-lg-6">
    <div class='block block-size-medium'>
<div class='block-heading'>
<div class='main-text'>Overtime requests</div>
</div>
<div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">
  <table id="example4" class="table table-striped table-condensed">
  <thead>
    <tr>
     <th class="col-md-3">Created</th>
     <th class="col-md-2">Type</th>
     <th class="">Assigned</th>
     <th>overtime</th>
     <th class="col-md-2">Status</th>
    </tr>
  </thead>
  <tbody>
  <tr>
   <td><a href="#">30/11/2015 09:00 AM</a></td>
   <td><a href="#">Registration</a></td>
   <td><a href="#">Hermans Glenn</a></td>
   <td><a href="#">10 min</a></td>
   <td><span class="label label-warning">Open</span></td>
  </tr>
  <tr>
   <td><a href="#">30/11/2015 09:00 AM</a></td>
   <td><a href="#">Request</a></td>
   <td><a href="#">Hermans Glenn</a></td>
   <td><a href="#">10 min</a></td>
   <td><span class="label label-success">Approved</span></td>
  </tr>  
  </tbody>
  </table>
  </div>
   </div>
  </div>
  </div>
 </div>
@endsection  

