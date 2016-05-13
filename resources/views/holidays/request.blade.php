@extends('header')
@section('content')
<div class="page-header">
<h2>Holiday requests</h2>
</div>

<div class="col-md-12">
 <div class='block block-size-medium'>
 <div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">

{!! Form::model(array('url' => "sick_notification/register", 'method' => "POST")) !!}
{!! csrf_field() !!}

<div class="form-group">
 <label for="type" class="form-label">{{Lang::get('tasks.schedule_type')}} <span class="text-danger">*</span></label>
 <select id="type" name="type" class="form-control">
  <option selected=""></option>
   <option value=""></option>
 </select>
</div>

<div class="form-group">
 <label for="start_date" class="form-label">{{Lang::get('tasks.taskStarts')}} <span class="text-danger">*</span></label>
 <input type='text' id="start_date" name="start_date" class="form-control" />
 </div>

<div class="form-group">
  <label for="stop_date" class="form-label">{{Lang::get('tasks.taskStops')}} <span class="text-danger">*</span></label>
  <input type="text" id="stop_date" name="stop_date" class="form-control">
</div>

<div class="form-group">
 <label for="description" class="form-label">{{Lang::get('tasks.description')}}</label>
 <textarea id="description" name="description" rows="10" class="form-control"></textarea>
</div>

<div class="form-group">
 <label for="save" class="form-label">&nbsp;</label>
 <button type="submit" name="save" class="btn btn-primary">Save</button>
 <button type="reset" name="reset" class="btn btn-danger">Cancel</button>
</div>
 
 </div>
 </div>
 </div>
 </div>


        <script type="text/javascript">
            $(function () {

              $('#start_date').datetimepicker({

              });

              $('#stop_date').datetimepicker({

              });
            });
        </script>
 @endsection