@extends('header')

@section('content')
<div class="page-header">
 <h2>Dashboard</h2>
</div>

<div class="row">
 <div class="col-md-12">
  <div class="pull-right">
   <button class="btn btn-default">Add tab</button>
   <button class="btn btn-default">Add widget</button>
  </div>
  </div>
 </div>

<div class="clearfix">&nbsp;</div>

<div class="col-lg-6">
 <div class='block block-size-medium'>
<div class='block-heading'>
<div class='main-text'>Tasks requests</div>
<div class="pull-right">
<a href="javascript:;" title="Settings" data-toggle="settings" class="btn btn-default btn-circle"><i class="fa fa-cog"></i></a>
 <span class="divider"></span>
 <a data-toggle="reload" title="Refresh" href="#refresh" class="btn btn-default btn-circle"><i class="fa fa-refresh"></i></a>
 <span class="divider"></span>
 <a href="#" title="Remove" data-toggle="remove" class="btn btn-default btn-circle"><i class="fa fa-times"></i></a>
</div>
</div>

 <div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">
  <table id="status" class="table table-striped table-condensed">
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
   <td>30/11/2015 09:00 AM</td>
   <td>Call back</td>
   <td>Hermans Glenn</td>
   <td>10:00 AM</td>
   <td><a href="#" id="status">Approved</a></td>
  </tr>

  <tr>
   <td>30/11/2015 09:00 AM</td>
   <td>Call back</td>
   <td>Hermans Glenn</td>
   <td>10:00 AM</td>
   <td><a href="#" id="status">Rejected</a></td>
  </tr>

  </tbody>
  </table>
<script>
$(document).ready(function() {
  $.fn.editable.defaults.mode = 'popup';
  $('#status a').editable({
    type: 'select',
            title: 'Select status',
            source: [
                {value: 1, text: 'Approved'},
                {value: 2, text: 'In progress '},
                {value: 3, text: 'Rejected'}
            ]
  });

  //ajax emulation
  $.mockjax({
      url: '/post',
      responseTime: 200
  });
});
    </script>
   </div>
   </div>
  </div>
  </div>
 </div>

 <div class="col-lg-6">
    <div class='block block-size-medium'>
<div class='block-heading'>
<div class='main-text'>Overtime requests</div>
<div class="pull-right">
<a href="javascript:;" title="Settings" data-toggle="settings" class="btn btn-default btn-circle"><i class="fa fa-cog"></i></a>
 <span class="divider"></span>
 <a data-toggle="reload" title="Refresh" href="#refresh" class="btn btn-default btn-circle"><i class="fa fa-refresh"></i></a>
 <span class="divider"></span>
 <a href="#" title="Remove" data-toggle="remove" class="btn btn-default btn-circle"><i class="fa fa-times"></i></a>
</div>
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
