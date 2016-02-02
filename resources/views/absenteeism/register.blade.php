@extends('header')
@section('content')
<div class="page-header">
<h2>Register absenteeism</h2>
</div>
<div class="panel panel-default">
  <div class="panel-body">
{!! Form::model(array('url' => "absenteeism/register", 'method' => "POST")) !!}
{!! csrf_field() !!}
<div class="row">
<div class="col-md-6">
<div class="form-group">
 <label for="employee" class="form-label">Employee<span class="text-danger">*</span></label>
 <input type="text" id="team_name" name="team_name" class="form-control">
</div>

<div class="form-group">
 <label for="team_manager" class="form-label">Type <span class="text-danger">*</span></label>
 <select id="team_manager" name="team_manager" class="form-control">
  <option selected=""></option>
  <option value="Sick">Sick</option>
  <option value="Extension">Extension</option>
 </select>
</div>
</div>

<div class="col-md-6">
<div class="form-group">
 <label for="start" class="form-label">Start date <span class="text-danger">*</span></label>
 <input type='date'  id="start_date" name="start_date" class="form-control" />
 </div>

<div class="form-group">
  <label for="stop_date" class="form-label">End date <span class="text-danger">*</span></label>
  <input type="date" id="stop_date" name="stop_date" class="form-control">
</div>
</div>
</div>
<div class="form-group">
 <label for="description" class="form-label">Description</label>
 <textarea id="description" name="description" rows="10" class="form-control"></textarea>
</div>

<div class="form-group">
 <label for="save" class="form-label">&nbsp;</label>
 <button type="submit" name="save" class="btn btn-primary">Save</button>
 <button type="reset" name="reset" class="btn btn-danger">Cancel</button>
</div>

</div>
{!! Form::close() !!}
</div>
</div>

        <script type="text/javascript">
            $(function () {
              $('#start_date').datetimepicker({
                format: 'YYYY-MM-DD'
              });

                $('#stop_date').datetimepicker({
                  format: 'YYYY-MM-DD'
                });
            });
        </script>

@endsection
