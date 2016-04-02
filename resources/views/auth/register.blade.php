<!DOCTYPE html>
<html lang="en">
 <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Time control</title>

     <link href="{!! asset('css/bootstrap.css') !!}" rel="stylesheet">
    <link href="{{ url('css/login.css') }}" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body class="login-page">
<!--Page Container Start Here-->
<section class="login-container">
<div class="container">
<div class="col-md-6 col-md-offset-2 col-sm-4 col-sm-offset-4">
<div class="login-form-container">

     @if (count($errors) > 0)
    <div class="alert alert-danger">
      <ul>
        @foreach ($errors->all() as $error)
          <li>{{ $error }}</li>
        @endforeach
      </ul>
    </div>
  @endif

<form method="POST" action="/auth/register" class="form-horizontal">
    {!! csrf_field() !!}

<input type="hidden" name="user_type" value="1">


            <div class="form-group">
                            <label for="name" class="col-md-4 control-label">{{ Lang::get('aop.last_name') }} <span class="text-danger">*</span></label>
                            <div class="col-md-7">
                                <input type="text" class="form-control" id="name" name="name" value="{{ old('name') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="fname" class="col-md-4 control-label">{{ Lang::get('aop.first_name') }} <span class="text-danger">*</span></label>
                            <div class="col-md-7">
                                <input type="text" class="form-control" id="fname" name="fname" value="{{ old('fname') }}">
                            </div>
                        </div>
            <div class="form-group">
              <label for="address" class="col-md-4 control-label">{{ Lang::get('aop.address') }} <span class="text-danger">*</span></label>
              <div class="col-sm-7">
                <input type="text" name="address" id="address" class="form-control">
              </div>
            </div>

            <div class="form-group">
              <label for="postal_code" class="col-md-4 control-label">{{ Lang::get('aop.city') }} <span class="text-danger">*</span></label>
              <div class="col-sm-2">
                <input type="text" name="postal_code" id="postal_code" class="form-control">
              </div>
              <div class="col-sm-5">
                <input type="text" name="city" id="city" class="form-control">
              </div>
            </div>


                        <div class="form-group">
                            <label for="email" class="col-md-4 control-label">{{ Lang::get('aop.email')}} <span class="text-danger">*</span></label>
                            <div class="col-md-7">
                                <input type="email" class="form-control" id="email" name="email" value="{{ old('email') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password" class="col-md-4 control-label">{{ Lang::get('aop.password') }} <span class="text-danger">*</span></label>
                            <div class="col-md-7">
                                <input type="password" class="form-control" id="password" name="password">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="confirm_pass" class="col-md-4 control-label">{{ Lang::get('aop.confirm_password') }} <span class="text-danger">*</span></label>
                            <div class="col-md-7">
                                <input type="password" class="form-control" id="confirm_password" name="confirm_password">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-3">
                                <button type="submit" class="btn btn-primary">   {{ Lang::get('aop.save') }}</button>
                <button type="button" onclick="location.href='{{ url('admin') }}';" class="btn btn-default">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
                </div>
                </section>
