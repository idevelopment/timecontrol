@extends('header')

@section('content')
<div class="page-header">
 <h2>Create department</h2>
</div>

<div class="col-md-12">
<form action="{{ url('staff/departments/docreate') }}" id="simple_wizard" method="post" class="form-horizontal">
{!! csrf_field() !!}
 <fieldset title="General info">
  <legend class="hide">Basic settings</legend>
   <div class="form-group">
    <label for="department_name" class="col-md-2 control-label">Department name <span class="text-danger">*</span></label>
    <div class="col-md-6">
     <input type="text" id="department_name" name="department_name" class="form-control">
    </div>
  </div>

<div class="form-group">
 <label for="department_manager" class="col-md-2 control-label">Department manager <span class="text-danger">*</span></label>
  <div class="col-md-6">
   <select id="department_manager" name="department_manager" class="form-control">
    <option></option>
     @foreach($managers as $manager_data)
      <option value="{{$manager_data->id}}">{{$manager_data->fname}} {{$manager_data->name}}</option>
     @endforeach
    </select>
   </div>
  </div>

<div class="form-group">
 <label for="department_description" class="col-md-2 control-label">Description</label>
 <div class="col-md-6">
  <textarea id="department_description" name="department_description" rows="10" class="form-control"></textarea>
 </div>
</div>
</fieldset>
<fieldset title="Teams">
 <legend class="hide">Assign your existing teams or create a new one</legend>

  <div class="form-group">
   <label for="teams" class="col-md-2 control-label">Teams <span class="text-danger">*</span></label>
   <div class="col-md-6">
   <select id="teams" name="teams[]" class="form-control">
    <option></option>
    @foreach($managers as $manager_data)
     <option value="{{$manager_data->id}}">{{$manager_data->fname}} {{$manager_data->name}}</option>
    @endforeach
  </select>
  </div>
  </div>

    <div class="form-group">
   <label for="teams" class="col-md-2 control-label">Create team</label>
   <div class="col-md-6">
    <input type="text" name="new_team" class="form-control">
  </div>
  </div>

 </fieldset>
 <fieldset title="Notifications">
  <legend class="hide">Configure notification settings</legend>

  <div class="form-group">
   <label for="teams" class="col-md-2 control-label">Account creation</label>
   <div class="col-md-6">
 <div class="checkbox">
  <label><input type="checkbox" value="">Notify administrator</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" value="">Notify managers</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" value="" disabled>None</label>
</div>
  </div>
  </div>

  <hr>

<div class="form-group">
   <label for="teams" class="col-md-2 control-label">Task request</label>
   <div class="col-md-6">
 <div class="checkbox">
  <label><input type="checkbox" value="">Notify administrator</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" value="">Notify managers</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" value="">Notify agent</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" value="" disabled>None</label>
</div>
 </div>
</div>  

<hr>

<div class="form-group">
 <label for="teams" class="col-md-2 control-label">Team creation</label>
  <div class="col-md-6">
   <div class="checkbox">
   <label><input type="checkbox" value="">Notify administrator</label>
  </div>
  
  <div class="checkbox">
   <label><input type="checkbox" value="">Notify managers</label>
  </div>

  <div class="checkbox">
  <label><input type="checkbox" value="" disabled>None</label>
  </div>
  </div>
 </div>

 </fieldset> 
  <button type="submit" class="finish btn btn-primary">{{ Lang::get('app.save')}}</button>
  </form>
</div>

<script type="text/javascript">
  $(document).ready(function() {
    department_wizard.simple();
    department_wizard.steps_nb();
  });

  department_wizard = {
    simple: function(){
      $('#simple_wizard').stepy({
        titleClick  : true,
        nextLabel:      'Next <i class="glyphicon glyphicon-chevron-right"></i>',
        backLabel:      '<i class="glyphicon glyphicon-chevron-left"></i> Back'
      });
    },

    //* add numbers to step titles
    steps_nb: function(){
      $('.stepy-titles').each(function(){
        $(this).children('li').each(function(index){
          var myIndex = index + 1
          $(this).append('<span class="stepNb">'+myIndex+'</span>');
        })
      })
    }
  }
</script>
@endsection
