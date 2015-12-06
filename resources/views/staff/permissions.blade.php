@extends('header')

@section('content')
<div class="page-header">
 <h2>Permissions</h2>
</div>

 <table class="table table-striped">
 <thead>
 	<th>Permission</th>
 	<th></th>
 </thead>

<tbody>
@foreach($permissions as $permission_item)
	<tr>
	 <td>{{ $permission_item->name }}</td>
	</tr>
 @endforeach	
</tbody>
 </table>

@endsection