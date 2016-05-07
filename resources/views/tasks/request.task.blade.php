@extends('header')
@section('content')
<div class="page-header">
<h2>{{Lang::get('tasks.sick_notification_register')}}</h2>
</div>

@if(count($errors) > 0)
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<div class="panel panel-default">
  <div class="panel-body">
{!! Form::model(array('url' => "sick_notification/register", 'method' => "POST")) !!}
{!! csrf_field() !!}
<div class="row">
<div class="col-md-6">
<div class="form-group">
 <label for="employee" class="form-label">{{Lang::get('tasks.sick_notification_employee')}}<span class="text-danger">*</span></label>
 <select name="employee" id="employee" class="form-control">
  <option selected=""></option>
 @foreach($users as $user_data)
  <option value="{{ $user_data->id }}">{{ $user_data->fname }} {{ $user_data->name }}</option>
 @endforeach
 </select>
</div>

<div class="form-group">
 <label for="type" class="form-label">{{Lang::get('tasks.schedule_type')}} <span class="text-danger">*</span></label>
 <select id="type" name="type" class="form-control">
  <option selected=""></option>
  <option value="Sick">Sick</option>
  <option value="Extension">Extension</option>
 </select>
</div>
</div>

<div class="col-md-6">
<div class="form-group">
 <label for="start_date" class="form-label">{{Lang::get('tasks.sick_notification_start')}} <span class="text-danger">*</span></label>
 <input type='date' id="start_date" name="start_date" class="form-control" />
 </div>

<div class="form-group">
  <label for="stop_date" class="form-label">{{Lang::get('tasks.sick_notification_stop')}} <span class="text-danger">*</span></label>
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
