@extends('header');
@section('content')
<div class="page-header">
<h2>Task requests</h2>
</div>

<div class="col-lg-12">

<div class="well well-sm">
<div class="btn-group">
<button class="btn btn-sm btn-primary" onclick="location.href='{{url('tasks/register')}}';"><i class="fa fa-plus"></i> Request task</button>
<!-- Button trigger modal -->
<button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#searchEmployee">
<i class="fa fa-search"></i> Search task</button>

<!-- Modal -->
<div class="modal" id="searchEmployee" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Search employee</h4>
      </div>
      <div class="modal-body">
      <form action="" method="POST" class="form-horizontal">

        <div class="form-group">
         <label for="name" class="form-label col-md-3">Name</label>
         <div class="col-md-9">
            <input type="text" id="name" name="name" class="form-control">
         </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Search</button>
      </div>
      </form>
      </div>
    </div>
  </div>
</div>

<button class="btn btn-sm btn-danger">Remove task</button>
</div>
</div>
</div>

<div class="col-lg-12">
 <div class='block block-size-medium'>
 <div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">

 <table class="table table-striped">
  <thead>
   <tr>
     <th>&nbsp;</th>
     <th>Type</th>
     <th>Assignee</th>
     <th>Priority</th>
     <th>Created</th>
     <th>Updated</th>
     <th>Status</th>
   </tr>
  </thead>
  <tbody>
    <tr>
     <td><input type="checkbox" name="id"></td>
     <td><a class="taskType" data-type="select" data-pk="1" data-url="/post" data-title="Select type" href="{{ url('tasks/details') }}">Callback</a></td>
     <td>Terrance Brakus</td>
     <td><span class="badge bg-red">High</span></td>
     <td><small>2016-03-26</small></td>
     <td><small>2016-03-26</small></td>
     <td><a href="#" class="status" data-type="select" data-pk="1" data-url="/post" data-title="Select status">Open</a></td>     
    </tr>

    <tr>
     <td><input type="checkbox" name="id"></td>
     <td><a class="taskType" data-type="select" data-pk="1" data-url="/post" data-title="Select type" href="{{ url('tasks/details') }}">Callback</a></td>
     <td>Terrance Brakus</td>
     <td><span class="badge bg-red">High</span></td>
     <td><small>2016-03-26</small></td>
     <td><small>2016-03-26</small></td>
     <td><a href="#" class="status" data-type="select" data-pk="1" data-url="/post" data-title="Select status">Open</a></td>     
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
  $.fn.editable.defaults.mode = 'popup';
  $('a.status').editable({
    type: 'select',
            title: 'Select status',
            source: [
                {value: 1, text: 'Approved'},
                {value: 2, text: 'In progress '},
                {value: 3, text: 'Rejected'},
                {value: 4, text: 'Open'}
            ]
  });

    $('a.taskType').editable({
    type: 'select',
            source: [
                {value: 1, text: 'Callback'},
                {value: 2, text: 'Case follow up'},
            ]
  });
  //ajax emulation
  $.mockjax({
      url: '/post',
      responseTime: 200
  });
});
    </script>
@endsection
