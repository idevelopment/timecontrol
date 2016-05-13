@extends('header')

@section('content')
<div class="page-header">
<h2>Holiday requests</h2>
</div>
<div class="well well-sm">
<div class="btn-group">
<button class="btn btn-sm btn-primary" onclick="location.href='{{url('holidays/register')}}';"><i class="fa fa-plus"></i> New request</button>
</div>
</div>

<div class="col-md-12">
 <div class='block block-size-medium'>
 <div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">
   <table class="table table-striped">
   	<thead>
   		<th>Employee</th>
   		<th>Type</th>
   		<th>From</th>
   		<th>Untill</th>
   		<th>Status</th>
   		<th>&nbsp;</th>
   	</thead>
   	<tbody>
   		<tr>
   		 <td>Glenn Hermans</td>
   		 <td>holiday</td>
   		 <td>12/05/2016</td>
   		 <td>20/05/2016</td>
   		 <td>In progress</td>
   		 <td><a href="{{ url('holidays/display/1')}}" data-toggle="tooltip" data-placement="bottom" title="Details"><i class="fa fa-search"></a></td>
   		</tr>

   		<tr>
   		 <td>Glenn Hermans</td>
   		 <td>half day leave</td>
   		 <td>12/04/2016 13:30 pm</td>
   		 <td>12/04/2016 17:30 pm</td>
   		 <td>In progress</td>
   		 <td><a href="{{ url('holidays/display/1')}}" data-toggle="tooltip" data-placement="bottom" title="Details"><i class="fa fa-search"></a></td>
   		</tr>   		
   	</tbody>
   </table>

  </div>
 </div>
 </div>
 </div>
 </div>
@endsection