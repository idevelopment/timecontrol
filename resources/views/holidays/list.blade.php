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
   		@foreach($query as $holiday)
			<tr>
				@foreach($holiday->users as $user)
					<td>{!! $user->fname !!}  {!! $user->name !!}</td>
				@endforeach

				<td>{{ $holiday->type  }}</td>
				<td>{{ $holiday->from }}</td>
				<td>{{ $holiday->until }}</td>
				<td>{{ $holiday->status }}</td>

				<td>
					<a href="" class="">
						<span class="fa fa-info-circle"></span>
					</a>

					<a href="" class="">
						<span class="fa fa-close"></span>
					</a>
				</td>
			</tr>
		@endforeach
   	</tbody>
   </table>

  </div>
 </div>
 </div>
 </div>
 </div>
@endsection