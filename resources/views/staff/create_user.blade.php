@extends('header')

@section('content')
<div class="page-header">
 <h2>{{ Lang::get('aop.users_create_title') }} </h2>
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
<div class="well">
	<form class="form-horizontal" role="form" method="POST" action="{{ url('staff/create') }}">
    {!! csrf_field() !!}
            <input type="hidden" name="user_type" value="1">


            <div class="form-group">
							<label for="name" class="col-md-2 control-label">{{ Lang::get('aop.last_name') }} <span class="text-danger">*</span></label>
							<div class="col-md-7">
								<input type="text" class="form-control" id="name" name="name" value="{{ old('name') }}">
							</div>
						</div>

						<div class="form-group">
							<label for="fname" class="col-md-2 control-label">{{ Lang::get('aop.first_name') }} <span class="text-danger">*</span></label>
							<div class="col-md-7">
								<input type="text" class="form-control" id="fname" name="fname" value="{{ old('fname') }}">
							</div>
						</div>
            <div class="form-group">
              <label for="address" class="col-md-2 control-label">{{ Lang::get('aop.address') }} <span class="text-danger">*</span></label>
              <div class="col-sm-7">
                <input type="text" name="address" id="address" class="form-control">
              </div>
            </div>

            <div class="form-group">
              <label for="postal_code" class="col-md-2 control-label">{{ Lang::get('aop.city') }} <span class="text-danger">*</span></label>
              <div class="col-sm-1">
                <input type="text" name="postal_code" id="postal_code" placeholder="Postal code" class="form-control">
              </div>
              <div class="col-sm-6">
                <input type="text" name="city" id="city" placeholder="City" class="form-control">
              </div>
            </div>



						<div class="form-group">
							<label for="email" class="col-md-2 control-label">{{ Lang::get('aop.email')}} <span class="text-danger">*</span></label>
							<div class="col-md-7">
								<input type="email" class="form-control" id="email" name="email" value="{{ old('email') }}">
							</div>
						</div>

						<div class="form-group">
							<label for="password" class="col-md-2 control-label">{{ Lang::get('aop.password') }} <span class="text-danger">*</span></label>
							<div class="col-md-7">
								<input type="password" class="form-control" id="password" name="password">
							</div>
						</div>

						<div class="form-group">
							<label for="confirm_pass" class="col-md-2 control-label">{{ Lang::get('aop.confirm_password') }} <span class="text-danger">*</span></label>
							<div class="col-md-7">
								<input type="password" class="form-control" id="confirm_password" name="confirm_password">
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-6 col-md-offset-3">
								<button type="submit" class="btn btn-primary">	{{ Lang::get('aop.save') }}</button>
                <button type="button" onclick="location.href='{{ url('admin') }}';" class="btn btn-danger">Cancel</button>
							</div>
						</div>
					</form>
				</div>

@endsection
