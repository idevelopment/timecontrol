@extends('header')

@section('content')
<div class="page-header">
<h2>Departments</h2>
</div>


<div class="well well-sm">
<div class="btn-group">
<button class="btn btn-sm btn-primary" onclick="location.href='{{url('staff/departments/create')}}';"><i class="fa fa-plus"></i> Add department</button>
<!-- Button trigger modal -->
<button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#searchEmployee">
<i class="fa fa-search"></i> Search department</button>

<!-- Modal -->
<div class="modal fade" id="searchEmployee" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Search employee</h4>
      </div>
      <div class="modal-body">
      <form action="" method="POST" class="form-horizontal">
      {{csrf_field()}}
        <div class="form-group">
         <label for="name" class="form-label col-md-3">Name</label>
         <div class="col-md-9">
         	<input type="text" id="name" name="name" class="form-control">
         </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
      </form>
      </div>
    </div>
  </div>
</div>

<button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#delete">Remove department</button>
</div>
</div>

<div class="panel panel-default">
<div class="panel-body">

<table class="table table-striped">
<thead>
<tr>
 <th>#</th>
 <th>Name</th>
 <th>Manager</th>
 <th class="col-sm-2 col-md-2">Created at</th>
 <th class="col-sm-2 col-md-2">Last updated</th>
 <th></th>
</tr>
</thead>
<tbody>
@forelse($departments as $department)
 <tr>
   <td><input type="checkbox" name="department_id" value="{{ $department->id}}"></td>
   <td><a href="{{ url("staff/departments/edit")}}/{{$department->id}}">{{ $department->department_name}}</a></td>

     @if(count($department->managers) > 0)
         @foreach($department->managers as $manager)
             <td>{{ $manager->fname}}</td>
         @endforeach
     @else
         <td>No manager</td>
     @endif

   <td>{{ $department->created_at}}</td>
   <td>{{ $department->updated_at}}</td>
   <td></td>
 </tr>
 @empty
 <tr>
   <td colspan="6" class="text-center">No department has been created</td>
 </tr>
 @endforelse
</tbody>
</table>

 {!! $departments->render() !!}


</div>
</div>

<!-- Modal -->
<div id="delete" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Waarschuwing!</h4>
            </div>
            <div class="modal-body">
                <p>U staat op het punt om een department te verwijderen. Weet u zeker dat u verder wilt gaan?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger">Ja</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Nee</button>
            </div>
        </div>

    </div>
</div>

@endsection
