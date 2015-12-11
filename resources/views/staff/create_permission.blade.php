@extends('header')

@section('content')
<div class="page-header">
  <h2>Create permission</h2>
</div>

<div class="panel panel-default">
<div class="panel-body">
<form action="" method="POST" class="form-horizontal">
 <div class="form-group">
  <label for="permission_name" class="form-label col-md-2">Permission name <span class="text-danger">*</span></label>
  <div class="col-md-6">
  <input type="text" id="permission_name" name="permission_name" class="form-control">
 </div>
 </div>

  <div class="form-group">
  <label for="permission_name" class="form-label col-md-2">Description</label>
  <div class="col-md-6">
   <textarea id="permission_name" name="permission_name" class="form-control"></textarea> 
   </div>
 </div>

   <div class="form-group">
  <label for="permission_name" class="form-label col-md-2">&nbsp;</label>
  <div class="col-md-6">
   <button type="submit" id="permission_name" name="permission_name" class="btn btn-primary"></button> 
   </div>
 </div>

 </form>
 </div>
 </div>

@endsection