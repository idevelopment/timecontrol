@extends('header')
@section('content')
    <div class="page-header">
        <h2>{{Lang::get('tasks.requestTask')}}</h2>
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
                        <select name="userid" id="employee" class="form-control">
                            <option selected=""></option>
                            @foreach($users as $user_data)
                                <option value="{{ $user_data->id }}" @if($user_data->id === $task->userid) selected @endif>
                                    {{ $user_data->fname }} {{ $user_data->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="type" class="form-label">{{Lang::get('tasks.schedule_type')}} <span class="text-danger">*</span></label>
                        <select id="type" name="type" class="form-control">
                            <option selected=""></option>
                            @foreach($tasks as $type_item)
                                <option value="{!! $type_item->name !!}" @if($task->type === $type_item->id) selected @endif>{!! $type_item->name !!}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label for="start_date" class="form-label">{{Lang::get('tasks.taskStarts')}} <span class="text-danger">*</span></label>
                        <input type='text' id="start_date" name="startdate" class="form-control" />
                    </div>

                    <div class="form-group">
                        <label for="enddate" class="form-label">{{Lang::get('tasks.taskStops')}} <span class="text-danger">*</span></label>
                        <input type="text" id="stop_date" name="enddate" class="form-control">
                    </div>
                </div>
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
        {!! Form::close() !!}
    </div>
    </div>

    <script type="text/javascript">
        $(function () {
            var dateSetting = "<?php echo config("timecontrol.date");?> <?php echo config("timecontrol.time"); ?>";

            $('#start_date').datetimepicker({
                format: dateSetting
            });

            $('#stop_date').datetimepicker({
                format: dateSetting
            });
        });
    </script>

@endsection