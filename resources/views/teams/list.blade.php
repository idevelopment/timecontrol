@extends('header')

@section('content')
<div class="page-header">
<h2>Teams</h2>
</div>
<div class="well well-sm">
<div class="btn-group">
<button class="btn btn-sm btn-primary" onclick="location.href='{{url('staff/teams/create')}}';"><i class="fa fa-plus"></i> New team</button>
</div>
</div>

<div class="panel panel-default">
  <div class="panel-body">
<table class="table table-striped">
<thead>
<th>Team</th>
<th>Department</th>
<th class="col-md-2">Total employee</th>
<th class="col-md-1"></th>
</thead>
<tbody>
@foreach($teams as $team_item)
  <tr>
    <td>{{ $team_item->name }}</td>
    <td>{{ $team_item->department }}</td>
    <td></td>
    <td><a href="{{ url('staff/teams/edit') }}/{{ $team_item->id }}"><i class="fa fa-pencil"></i> <a href="{{ url('staff/teams/remove') }}/{{ $team_item->id }}"><i class="fa fa-times"></i></a></td>

  </tr>
  @endforeach
</tbody>
</table>
{!! $teams->render() !!}
</div>
</div>
@endsection
