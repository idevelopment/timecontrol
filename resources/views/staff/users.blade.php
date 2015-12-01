@extends('header')

@section('content')
<div class="page-header">
 <h2>Manage staff</h2>
</div>

<div class="well well-sm">
<div class="btn-group">
<button class="btn btn-sm btn-primary">Add employee</button>
<button class="btn btn-sm btn-primary">Search employee</button>
<button class="btn btn-sm btn-primary">Add employee</button>
</div>

</div>

<table class="table table-bordered table-striped">
<thead>
<tr>
 <th>Name</th>
 <th>Department</th>
 <th>Team</th>
 <th>Email</th>
</tr>
</thead>
<tbody>
@foreach ($users as $user_item)
<tr>
 <td>{{ $user_item->name }} {{ $user_item->fname }}</td>
 <td>none</td>
 <td>none</td>
 <td>{{ $user_item->email }}</td>
</tr>
@endforeach
</tbody>

</table>
@endsection

