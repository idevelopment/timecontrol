@extends('header')
@section('content')
<div class="page-header">
 <h2>Break history</h2>
</div>

<div class="col-lg-12">
 <div class="block block-size-medium">
 <div class="block-content-outer">
 <div class="block-content-inner">
  <div class="container-fluid">
   <div id="chart_div" style="min-height: 300px;"></div>
   <div class="clearfix">&nbsp;</div>

   <table class="table table-striped">
   <thead>
   	<tr>
   	 <th>Date</th>
   	 <th>Start</th>
   	 <th>End</th>   	 
   	</tr>
   </thead>
   <tbody>
   	<tr>
   		<td>01/04/2016</td>
   		<td>08:00 AM</td>
   		<td>08:10 AM</td>
   	</tr>
   </tbody>
   </table>
  </div>
 </div>
 </div>
 </div>
 </div>

<script type="text/javascript">
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawColColors);

function drawColColors() {
      var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'Time of Day');
      data.addColumn('number', 'Time');

      data.addRows([
        [{v: [10, 00, 00]}, 1],
        [{v: [13, 30, 0]}, 1],
        [{v: [14, 40, 0]}, 1],
        [{v: [16, 20, 0]}, 1],
      ]);

      var options = {
        title: '',
        colors: ['#9575cd', '#33ac71'],
        hAxis: {
          title: 'Time of Day',
          format: 'h:mm a',
          viewWindow: {
            min: [08, 0, 0],
            max: [17, 30, 0],
          },

        },
        vAxis: {
          title: 'Break history'          
        }
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
</script>
@endsection
