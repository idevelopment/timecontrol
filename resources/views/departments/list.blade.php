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

<button class="btn btn-sm btn-danger">Remove department</button>
</div>
</div>

<table class="table table-striped">
<thead>
<tr>
 <th>#</th>
 <th>Name</th>
 <th class="col-sm-2 col-md-2">Total teams</th>
 <th class="col-sm-2 col-md-2">Total employees</th>
 <th></th>
</tr>
</thead>
<tbody>
 <tr>
   <td><input type="checkbox" name="" value=""></td>
   <td>Department 1</td>
   <td>15</td>
   <td>15</td>  
   <td></td> 
 </tr>
</tbody>
</table>
@endsection