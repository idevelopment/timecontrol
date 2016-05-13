@extends('header')
@section('content')
<div class="page-header">
<h2>Holiday request</h2>
</div>

<div class="col-md-12">
 <div class='block block-size-medium'>
 <div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">
   <form action="" method="post" class="form-horizontal">
    {!! csrf_field() !!}
  
  <div class="row">
   <div class="col-md-6">
   <div class="form-group formSep">
    <label for="type" class="col-md-2 control-label">{{Lang::get('tasks.schedule_type')}} <span class="text-danger">*</span></label>
   <div class="col-md-10">
   <p class="form-control-static">Holiday</p>
 </div>
</div>

<div class="form-group formSep">
 <label for="employee" class="col-md-2 control-label">Employee <span class="text-danger">*</span></label>
 <div class="col-md-10">
  <p class="form-control-static">Glenn Hermans</p>
 </div>
  </div>
 
 </div>
 <div class="col-md-6">
<div class="form-group formSep">
 <label for="from" class="col-md-2 control-label">From <span class="text-danger">*</span></label>
 <div class="col-md-10">
 <input type='text' id="start_date" name="from" class="form-control" />
 </div>
  </div>

  <div class="form-group formSep">
 <label for="untill" class="col-md-2 control-label">Untill <span class="text-danger">*</span></label>
 <div class="col-md-10">
 <input type='text' id="untill_date" name="untill" class="form-control" />
 </div>
  </div>
 </div>
</div>

<div class="row">
<div class="col-md-12">
  <div class="form-group formSep">
 <label for="description" class="col-md-1 control-label">Description <span class="text-danger">*</span></label>
 <div class="col-md-11">
 <p class="form-control-static">
  	 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula arcu nec elit dignissim gravida. Maecenas malesuada libero feugiat nulla ornare, sed dapibus tellus tristique. Nulla facilisi. Phasellus at erat mi. Etiam sagittis hendrerit ex, vel varius ante ullamcorper eget. Donec varius nulla vitae tincidunt tempus. Pellentesque interdum, metus at ornare lacinia, ipsum tellus volutpat eros, in auctor tellus tortor eget lorem. Ut malesuada felis vel tempus facilisis.<br /> <br />

Nam nec blandit tortor. Sed nec metus quis magna malesuada hendrerit. Donec et lorem nec tellus semper sodales. Praesent nec porttitor ex. Sed mattis volutpat lorem, at euismod sapien tincidunt sed. Maecenas vel luctus elit. Aenean porta dapibus faucibus. Nullam ullamcorper diam eget lobortis pretium. Praesent id porta risus.<br />
 	</p>
 </div>
  </div>
  </div>
</div>
</form>
  </div>
  </div>
 </div>
 @endsection