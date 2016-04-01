@extends('header')

@section('content')
<div class="page-header">
 <h2>Create department</h2>
</div>


	<div class="col-md-12">
		<section>
        <div class="wizard">
            <div class="wizard-inner">
                <div class="connecting-line"></div>
                <ul class="nav nav-tabs" role="tablist">

                    <li role="presentation" class="active">
                        <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" title="Step 1">
                            <span class="round-tab">
                                <i class="fa fa-info"></i>
                            </span>
                        </a>
                    </li>

                    <li role="presentation" class="disabled">
                        <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" title="Step 2">
                            <span class="round-tab">
                                <i class="fa fa-users"></i>
                            </span>
                        </a>
                    </li>
                    <li role="presentation" class="disabled">
                        <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="Step 3">
                            <span class="round-tab">
                                <i class="fa fa-envelope"></i>
                            </span>
                        </a>
                    </li>

                    <li role="presentation" class="disabled">
                        <a href="#complete" data-toggle="tab" aria-controls="complete" role="tab" title="Complete">
                            <span class="round-tab">
                                <i class="glyphicon glyphicon-ok"></i>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>

<form action="{{ url('staff/departments/docreate') }}" method="POST">
{!! csrf_field() !!}
  <div class="tab-content">
    <div class="tab-pane active" role="tabpanel" id="step1">
     <h3>General department info</h3>

<div class="form-group">
 <label for="department_name" class="form-label">Department name <span class="text-danger">*</span></label>
 <input type="text" id="department_name" name="department_name" class="form-control">
</div>

<div class="form-group">
 <label for="department_manager" class="form-label">Department manager <span class="text-danger">*</span></label>
 <select id="department_manager" name="department_manager" class="form-control">
  <option></option>
  @foreach($managers as $manager_data)
  <option value="{{$manager_data->id}}">{{$manager_data->fname}} {{$manager_data->name}}</option>
  @endforeach
 </select>
</div>

<div class="form-group">
 <label for="department_description" class="form-label">Description</label>
 <textarea id="department_description" name="department_description" rows="10" class="form-control"></textarea>
</div> 

 <div class="form-group">
 <button type="button" class="btn btn-primary next-step">Next</button>
 </div>
</div>
    <div class="tab-pane" role="tabpanel" id="step2">
     <h3>Assign a team</h3>
     <p>Assign your existing teams or create a new one</p>

     <div class="form-group">
 <label for="teams" class="form-label">Teams <span class="text-danger">*</span></label>
 <select id="teams" name="teams[]" class="form-control">
  <option></option>
  @foreach($managers as $manager_data)
  <option value="{{$manager_data->id}}">{{$manager_data->fname}} {{$manager_data->name}}</option>
  @endforeach
 </select>
</div>


 <div class="form-group">
       <button type="button" class="btn btn-default prev-step">Previous</button>
       <button type="button" class="btn btn-primary next-step">Next</button>
     </div>
    </div>
    <div class="tab-pane" role="tabpanel" id="step3">
      <h3>Notification settings</h3>
       <p>This is step 3</p>

<div class="checkbox">
  <label>
    <input type="checkbox" value="">
    Department creation 
  </label>
</div>
<div class="checkbox disabled">
  <label>
    <input type="checkbox" value="" disabled>
    Team assigned
  </label>
</div>

 <div class="form-group">
  <button type="button" class="btn btn-default prev-step">Previous</button>
  <button type="submit" class="btn btn-primary btn-info-full next-step">Save and continue</button>
 </div>
 </div>

 <div class="tab-pane" role="tabpanel" id="complete">
  <h3>Complete</h3>
   <p>You have successfully completed all steps.</p>
  </div>
   <div class="clearfix">&nbsp;</div>
   <div class="clearfix">&nbsp;</div>   
   </div>
  </form>
 </div>
</section>
</div>

<script type="text/javascript">
	$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}
</script>
@endsection
