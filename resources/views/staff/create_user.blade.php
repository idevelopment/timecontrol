@extends('header')
@section('content')
<div class="page-header">
 <h2>{{ Lang::get('staff.createUserTitle') }} </h2>
</div>


 <div class="clearfix">&nbsp;</div>
	@if (count($errors) > 0)
  <div class="alert alert-danger alert-dismissible fade in" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
	<ul>
	@foreach ($errors->all() as $error)
	<li>{{ $error }}</li>
			@endforeach
	</ul>
 </div>
@endif

@if (Session::has('message'))
   <div class="alert alert-success alert-dismissible fade in" role="alert">
     <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
     {{ Session::get('message') }}
   </div>
@endif


<div class="col-md-12">
<form action="{{url('staff/create')}}" id="user_wizard" method="post" class="form-horizontal">

{!! csrf_field() !!}
 <fieldset title="Basic information">
  <legend class="hidden">Basic employee information</legend>

<div class="form-group formSep">
 <label for="name" class="col-md-2 control-label">
     {{ Lang::get('staff.lastName') }}
     <span v-if="! newUser.lastName" class="text-danger">*</span>
 </label>
 <div class="col-md-5">
   <input type="text" class="form-control" id="name" name="name" value="{{ old('name') }}" v-model="newUser.lastName">
  </div>
 </div>

<div class="form-group formSep">
 <label for="fname" class="col-md-2 control-label">
     {{ Lang::get('staff.firstName') }}
     <span v-if="! newUser.firstName" class="text-danger">*</span>
 </label>
 <div class="col-md-5">
  <input type="text" class="form-control" id="fname" name="fname" value="{{ old('fname') }}" v-model="newUser.firstName">
 </div>
</div>

 <div class="form-group formSep">
  <label for="email" class="col-md-2 control-label">
      {{ Lang::get('staff.email')}}
      <span v-if="! newUser.email" class="text-danger">*</span>
  </label>
  <div class="col-md-5">
	<input type="email" class="form-control" id="email" name="email" value="{{ old('email') }}" v-model="newUser.email">
  </div>
 </div>

<div class="form-group formSep">
 <label for="password" class="col-md-2 control-label">
     {{ Lang::get('staff.password')}}
     <span v-if="! newUser.password" class="text-danger">*</span></label>
  <div class="col-md-5">
   <input type="password" class="form-control" id="password" name="password" v-model="newUser.password">
  </div>
 </div>

<div class="form-group formSep">
 <label for="confirm_pass" class="col-md-2 control-label">
     {{ Lang::get('staff.confirmPassword')}}
     <span v-if="! newUser.passwordConfirm" class="text-danger">*</span>
 </label>
 <div class="col-md-5">
  <input type="password" class="form-control" id="confirm_password" name="confirm_password" v-model="newUser.passwordConfirm">
 </div>
 </div>

</fieldset>

<fieldset title="Contact information">
 <legend class="hide">Contact details</legend>

<div class="form-group formSep">
 <label for="address" class="col-md-2 control-label">
     {{ Lang::get('staff.address') }}
     <span v-if="! newUser.address" class="text-danger">*</span>
 </label>
 <div class="col-sm-5">
  <input type="text" name="address" id="address" v-model="newUser.address" class="form-control">
 </div>
</div>

<div class="form-group formSep">
 <label for="postal_code" class="col-md-2 control-label">
     {{ Lang::get('staff.city') }}
     <span v-if="! newUser.city && ! newUser.postal" class="text-danger">*</span>
 </label>
 <div class="col-sm-2">
  <input type="text" name="postal_code" v-model="newUser.postal" id="postal_code" placeholder="Postal code" class="form-control">
 </div>
 <div class="col-sm-3">
  <input type="text" name="city" id="city" v-model="newUser.city" placeholder="City" class="form-control">
 </div>
 </div>

<div class="form-group formSep">
 <label for="country" class="form-label col-md-2">
     {{ Lang::get('staff.country') }}
     <span v-if="! newUser.country" class="text-danger">*</span>
 </label>
 <div class="col-md-5">
  <select name="country" v-model="newUser.country" class="form-control">
  <option value="" selected=""></option>
   @foreach($countries as $countr_item)
    <option value="{{ $countr_item->country }}">{{ $countr_item->country }}</option>
    @endforeach
  </select>
 </div>
 </div>

<div class="form-group formSep">
 <label for="mobile" class="col-md-2 control-label">
     {{ Lang::get('staff.homePhone') }}
     <span v-if="! newUser.phone" class="text-danger">*</span>
 </label>
 <div class="col-sm-5">
  <input type="text" name="mobile" v-model="newUser.phone" id="mobile" class="form-control">
 </div>
</div>

<div class="form-group formSep">
 <label for="mobile" class="col-md-2 control-label">
     {{ Lang::get('staff.mobilePhone') }}
     <span v-if="! newUser.mobilePhone" class="text-danger">*</span>
 </label>
 <div class="col-sm-5">
  <input type="text" name="mobile" v-model="newUser.mobilePhone" id="mobile" class="form-control">
 </div>
</div>

</fieldset>

 {{-- Permission view --}}
 @if(auth()->user()->is('Administrator') || auth()->user()->is('Manager'))
 <fieldset title="Permissions">
  <legend class="hidden">The permission information</legend>

  <div class="form-group formSep">
   <label for="permission" class="col-md-2 control-label">
    Permission:
    <span class="text-danger">*</span>
   </label>
   <div class="col-md-5">
        <select name="permissions" class="form-control" id="permission">
           @foreach($roles as $role)
            <option value="{{ $role->name }}"> {{ $role->name }}</option>
           @endforeach
        </select>
   </div>
  </div>

 </fieldset>
 @endif
 {{-- End permission view --}}

 <div class="clearfix">&nbsp;</div>
 <button type="submit" class="finish btn btn-primary">{{ Lang::get('app.save')}}</button>
  </form>

<script type="text/javascript">
  $(document).ready(function() {
    user_wizard.validation();
    user_wizard.steps_nb();
  
 });

  user_wizard = {

    validation: function(){
      $('#user_wizard').stepy({
        nextLabel:      'Forward <i class="glyphicon glyphicon-chevron-right"></i>',
        backLabel:      '<i class="glyphicon glyphicon-chevron-left"></i> Backward',
        block   : true,
        errorImage  : true,
        titleClick  : true,
        validate  : true
      });

      stepy_validation = $('#user_wizard').validate({
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
         'name': {required: true},
         'fname': {required: true},
         'address': {required: true},
         'postal_code': {required: true},
         'city': {required: true},
         'country': {required: true},
         'email': {required: true},
         'password': {
            required: true,
            minlength: 6,
            maxlength: 25
        },
        'confirmpassword': {
            required: true,
            minlength: 5,
            maxlength: 25,
            equalTo: "#password"
        }
      },
        ignore: ':hidden'
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
