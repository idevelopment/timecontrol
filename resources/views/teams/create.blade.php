@extends('header')

@section('content')
<div class="page-header">
<h2>Create team</h2>
</div>


<form action="{{ url('staff/teams/create') }}" id="team_wizard" method="post" class="form-horizontal">
{!! csrf_field() !!}

<fieldset title="{{Lang::get('teams.basicTitle')}}">
 <legend class="hide">&nbsp;</legend>
  <div class="form-group formSep">
   <label for="department" class="col-md-2 control-label">{{Lang::get('teams.department')}} <span class="text-danger">*</span></label>
   <div class="col-md-6">
  <select id="department" name="department" class="form-control">
   <option selected=""></option>
  @foreach($departments as $department_item)
   <option value="{{$department_item->id}}">{{$department_item->department_name}}</option>
  @endforeach   
  </select>
</div>
</div>

<div class="form-group formSep">
    <label for="team_name" class="col-md-2 control-label">{{Lang::get('teams.name')}} <span class="text-danger">*</span></label>
    <div class="col-md-6">
     <input type="text" id="team_name" name="team_name" class="form-control">    
    </div>
  </div>

<div class="form-group formSep">
 <label for="team_manager" class="col-md-2 control-label">{{Lang::get('teams.manager')}} <span class="text-danger">*</span></label>
<div class="col-md-6">
 <select id="team_manager" name="team_manager" class="form-control" multiple="">
  <option selected=""></option>
  @foreach($users as $user_item)
   <option value="{{$user_item->id}}">{{$user_item->fname}} {{$user_item->name}}</option>
  @endforeach
 </select>
 <p class="">{{Lang::get('teams.managersHelper')}}</p>
 </div>
</div>
</fieldset>

 <fieldset title="{{Lang::get('teams.membersTitle')}}">
  <legend class="hide">&nbsp;</legend>
   <div class="form-group formSep">
    <label for="team_members" class="col-md-2 control-label">{{Lang::get('teams.members')}} <span class="text-danger">*</span></label>
    <div class="col-md-6">
     <div id="membersList"></div>
    </div>
  </div>
</fieldset>

<fieldset title="{{Lang::get('teams.notificationsTitle')}}">
<legend class="hide">&nbsp;</legend>

<div class="form-group formSep">
   <label for="teams" class="col-md-2 control-label">Account creation</label>
   <div class="col-md-6">
 <div class="checkbox">
  <label><input type="checkbox" value="">Notify administrators</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" value="">Notify managers</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" value="" disabled>None</label>
</div>
  </div>
</div>

<div class="form-group formSep">
   <label for="teams" class="col-md-2 control-label">Call in sick</label>
   <div class="col-md-6">
 <div class="checkbox">
  <label><input type="checkbox" value="">Notify all administrators</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" value="">Notify all managers</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" value="">Notify agent</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" value="" disabled>None</label>
</div>
 </div>
</div>

<div class="form-group formSep">
   <label for="teams" class="col-md-2 control-label">Task request</label>
   <div class="col-md-6">
 <div class="checkbox">
  <label><input type="checkbox" value="">Notify all administrator</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" value="">Notify all managers</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" value="">Notify agent</label>
</div>
<div class="checkbox">
  <label><input type="checkbox" value="" disabled>None</label>
</div>
 </div>
</div> 

</fieldset>

<div class="clearfix">&nbsp;</div>
 <button type="submit" class="finish btn btn-primary">{{ Lang::get('app.save')}}</button>
</form>


<script type="text/javascript">
 $(document).ready(function() {
  

  team_wizard.validation();
  team_wizard.steps_nb();
 
  });
  team_wizard = {

    validation: function(){
      $('#team_wizard').stepy({
        nextLabel:      'Forward <i class="glyphicon glyphicon-chevron-right"></i>',
        backLabel:      '<i class="glyphicon glyphicon-chevron-left"></i> Backward',
        block   : true,
        errorImage  : true,
        titleClick  : true,
        validate  : true
      });

      var val = {
      	01: {id: 01, text: 'Isis'},
      	02: {id: 02, text: 'Sophia'},
      	03: {id: 03, text: 'Alice'},
      	04: {id: 04, text: 'Isabella'},
      	05: {id: 05, text: 'Manuela'},
      	06: {id: 06, text: 'Laura'}
      	  
      	  };

      var pick = $("#membersList").pickList({data: val});

      stepy_validation = $('#team_wizard').validate({
        onfocusout: false,
        highlight: function(element) {
          $(element).closest("div.form-group").addClass("error f_error");
          var thisStep = $(element).closest('form').prev('ul').find('.current-step');
          thisStep.addClass('error-image');
        },
        unhighlight: function(element) {
          $(element).closest("div.form-group").removeClass("error f_error");
          if(!$(element).closest('form').find('div.error').length) {
            var thisStep = $(element).closest('form').prev('ul').find('.current-step');
            thisStep.removeClass('error-image');
          };
        },
        
        errorElement: 'span help-block',
        errorClass: 'text-danger',
        errorPlacement: function(error, element) {
        if(element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
        rules: {
          'department': {required: true},
          'team_name': {required:true},
          'team_manager': {required:true},
         }, messages: {
          'department'  : { required: 'Department field is required!' },
          'team_name'   : { required: 'Please fill in a name for this team'},
          'team_manager': { required: 'Manager field is required!' }
        },
        ignore        : ':hidden'
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
