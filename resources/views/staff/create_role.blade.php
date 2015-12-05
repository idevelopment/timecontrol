@extends('header')

@section('content')
<div class="page-header">
 <h2>Create new role</h2>
</div>

<div class="well">
<form action="{{ url('staff/policies/create') }}" method="POST">

{!! csrf_field() !!}

<div class="form-group">
 <label for="role_name" class="form-label">Role name <span class="text-danger">*</span></label>
 <input type="text" id="role_name" name="role_name" class="form-control">
</div>


<div class="form-group">
 <label for="role_description" class="form-label">Description</label>
 <textarea id="role_description" name="role_description" rows="10" class="form-control"></textarea>
</div>

<div class="form-group">
 <label for="save" class="form-label">&nbsp;</label>
 <button type="submit" name="save" class="btn btn-primary">Save</button>
 <button type="reset" name="reset" class="btn btn-danger">Cancel</button>

</div>
</form>

</div>

@endsection