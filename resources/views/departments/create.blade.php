@extends('header')

@section('content')
<div class="page-header">
 <h2>Create department</h2>
</div>

<div class="well">
<form action="{{ url('staff/departments/docreate') }}" method="POST">

{!! csrf_field() !!}

<div class="form-group">
 <label for="department_name" class="form-label">Department name <span class="text-danger">*</span></label>
 <input type="text" id="department_name" name="department_name" class="form-control">
</div>

<div class="form-group">
 <label for="department_manager" class="form-label">Department manager <span class="text-danger">*</span></label>
 <select id="department_manager" name="department_manager" class="form-control">
  <option></option>
  <option value="Admin">Administrator</option>
  <option value="Glenn">Glenn Hermans</option>
 </select>
</div>

<div class="form-group">
 <label for="department_description" class="form-label">Description</label>
 <textarea id="department_description" name="department_description" rows="10" class="form-control"></textarea>
</div>

<div class="form-group">
 <label for="save" class="form-label">&nbsp;</label>
 <button type="submit" name="save" class="btn btn-primary">Create department</button>
 <button type="reset" name="reset" class="btn btn-danger">Cancel</button>

</div>
</form>

</div>

@endsection