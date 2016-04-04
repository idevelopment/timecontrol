@extends('header')

@section('content')
<div class="page-header">
 <h2>Create department</h2>
</div>

<div class="col-md-12">
<form action="{{ url('staff/departments/docreate') }}" id="simple_wizard" method="post" class="form-horizontal">
{!! csrf_field() !!}
 <fieldset title="{{Lang::get('departments.basic')}}">
  <legend class="hide">{{Lang::get('departments.basicHelper')}}</legend>
   <div class="form-group">
    <label for="department_name" class="col-md-2 control-label">{{Lang::get('departments.name')}} <span class="text-danger">*</span></label>
    <div class="col-md-6">
     <input type="text" id="department_name" name="department_name" class="form-control">
     <span id="helpBlock" class="help-block">{{Lang::get('departments.nameHelper')}}</span>     
    </div>
  </div>

<div class="form-group">
 <label for="department_manager" class="col-md-2 control-label">{{Lang::get('departments.manager')}} <span class="text-danger">*</span></label>
  <div class="col-md-6">
   <select id="department_manager" name="department_manager" class="form-control" multiple="">
    <option></option>
     @foreach($managers as $manager_data)
      <option value="{{$manager_data->id}}">{{$manager_data->fname}} {{$manager_data->name}}</option>
     @endforeach
    </select>
     <span id="helpBlock" class="help-block">{{Lang::get('departments.departmentHelper')}}</span>         
   </div>
  </div>

<div class="form-group">
 <label for="department_description" class="col-md-2 control-label">{{Lang::get('departments.description')}}</label>
 <div class="col-md-6">
  <textarea id="department_description" name="department_description" rows="10" class="form-control"></textarea>
  <span id="helpBlock" class="help-block">{{Lang::get('departments.descriptionHelper')}}</span>     
 </div>
</div>
</fieldset>
<fieldset title="{{Lang::get('departments.teams')}}">
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
 <fieldset title="{{Lang::get('departments.notifications')}}">
  <legend class="hide">{{Lang::get('departments.notificationsHelper')}}</legend>

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

<fieldset title="Workhours">
<legend class="hide">Assign the workhours that are allowed for this department</legend>

<table class="table" id="tab_logic">
        <thead>
          <tr >
            <th class="text-center">
              #
            </th>
            <th class="text-center">
              Name
            </th>
            <th class="text-center">
              Start hour
            </th>
            <th class="text-center">
              End hour
            </th>
          </tr>
        </thead>
        <tbody>
          <tr id='addr0'>
            <td class="text-center">1</td>
            <td><input type="text" name='name0'  placeholder='Name' class="form-control"/></td>
            <td><input type="text" name='start_time0' id='start_time' class="form-control"/></td>
            <td><input type="text" name='stop_time0' id='stop_time' class="form-control"/></td>
          </tr>
          <tr id='addr1'></tr>
        </tbody>
      </table>
  
  <a id="add_row" class="btn btn-default pull-left">Add Row</a>&nbsp;
  <a id='delete_row' class="btn btn-danger">Delete Row</a>
 <div class="clearfix">&nbsp;</div>
 </fieldset>
 <div class="clearfix">&nbsp;</div>
 <button type="submit" class="finish btn btn-primary">{{ Lang::get('app.save')}}</button>
  </form>
</div>

<script type="text/javascript">
  $(document).ready(function() {
    department_wizard.simple();
    department_wizard.steps_nb();
  
   var i=1;
    $("#add_row").click(function(){
    $('#addr'+i).html("<td class='text-center'>"+ (i+1) +"</td><td><input name='name"+i+"' type='text' placeholder='Name' class='form-control input-md'  /> </td><td><input  name='start"+i+"' type='text' id='start_time' class='form-control'></td><td><input  name='stop"+i+"' type='text' id='stop_time' class='form-control input-md'></td>");

      $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
      i++; 
  });
     $("#delete_row").click(function(){
       if(i>1){
     $("#addr"+(i-1)).html('');
     i--;
     }
   });
  
   $('#start_time').datetimepicker({
      format: 'hh:mm'
    });

   $('#stop_time').datetimepicker({
     format: 'hh:mm'
    });    
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
