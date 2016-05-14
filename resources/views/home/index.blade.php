@extends('header')

@section('content')
<div class="page-header">
 <h2>Dashboard</h2>
</div>

<div class="row">
 <div class="col-md-12">
  <div class="pull-right">
   <button class="btn btn-default">Add widget</button>
  </div>
  </div>
 </div>

<div class="clearfix">&nbsp;</div>

<div class="row">
<div class="col-lg-12">
 <div class='block block-size-medium'>
<div class='block-heading'>
<div class='main-text'>Employees timetable for today</div>
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
      <div id="chart_div" style="height: 280px;"></div>
<script>
      google.charts.load('current', {'packages':['timeline']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Team');
      data.addColumn('date', 'Season Start Date');
      data.addColumn('date', 'Season End Date');

      data.addRows([
        ['Glenn Hermans', new Date(2016, 4, 2, 8, 30), new Date(2016, 4, 2, 16, 30)],
        ['Tim Joosten', new Date(2016, 4, 2, 9, 30), new Date(2016, 4, 2, 17, 30)],
        ['Demo agent', new Date(2016, 4, 2, 13, 30), new Date(2016, 4, 2, 21, 00)],
        ['Demo agent 2', new Date(2016, 4, 2, 14, 30), new Date(2016, 4, 2, 22, 00)],        
        ['Demo agent 3', new Date(2016, 4, 2, 13, 30), new Date(2016, 4, 2, 21, 00)],

      ]);

      var options = {
        height: 450,
        timeline: {
          groupByRowLabel: true
        }
      };

      var chart = new google.visualization.Timeline(document.getElementById('chart_div'));

      chart.draw(data, options);
    }
    </script>
   </div>
   </div>
  </div>
  </div>
</div>
</div>

<div class="row">
<div class="col-lg-6">
  @widget('recentTasks')

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
  <table id="ostatus" class="table table-striped table-condensed">
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
   <td>30/11/2015 09:00 AM</td>
   <td>Registration</td>
   <td>Hermans Glenn</td>
   <td>10 min</td>
   <td><a href="#" id="ostatus">Rejected</a></td>
  </tr>
  <tr>
   <td>30/11/2015 09:00 AM</td>
   <td>Request</td>
   <td>Hermans Glenn</td>
   <td>10 min</td>
   <td><a href="#" id="ostatus">Rejected</a></td>
  </tr>
  </tbody>
  </table>
  </div>
   </div>
  </div>
  </div>
</div>
<script>
$(document).ready(function() {
$("[data-tt=tooltip]").tooltip({ placement: 'bottom' });

    $('#ostatus a').editable({
    type: 'select',
            title: 'Select status',
            source: [
                {value: 1, text: 'Approved'},
                {value: 2, text: 'In progress '},
                {value: 3, text: 'Rejected'}
            ]
  });
  });

</script>

</div>

@endsection
