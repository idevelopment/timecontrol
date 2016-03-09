@extends('header')

@section('content')
<div class="page-header">
 <h2>Account management</h2>
</div>

<div class="col-md-12">
            <ul class="nav nav-tabs tabs-float tabs-dark font-12">
              <li role="presentation" class="active"><a href="#infoTab" data-toggle="tab">General</a></li>
              <li role="presentation"><a href="#changepass" data-toggle="tab">Change password</a></li>
            </ul>

            <div class="tab-content b-all no-b-t p-20 bg-white font-12">
              <div class="tab-pane fade in active" id="infoTab">
               <form action="{{ url('profile/edit') }}" enctype="multipart/form-data" method="POST">
                 {!! csrf_field() !!}

                <div class="row">
                  <div class="col-md-6">
                    <div class="font-semi-bold font-14 text-main">General details</div>
                    <hr class="line-dashed m-t-10 m-b-20">
                    <div class="form-group">
                      <label for="fname">First name <span class="text-danger">*</span></label>
                      <input type="text" name="fname" id="fname" value="{{ Auth::user()->fname }}" class="form-control">
                    </div>

                    <div class="form-group">
                      <label for="name">Name <span class="text-danger">*</span></label>
                      <input type="text" name="name" id="name" value="{{ Auth::user()->name }}" class="form-control">
                    </div>

                    <div class="form-group">
                      <label for="email">Email Address <span class="text-danger">*</span></label>
                      <input type="email" name="email" id="email" value="{{ Auth::user()->email }}" class="form-control">
                    </div>
                    <div class="form-group">
                      <label for="address">Address <span class="text-danger">*</span></label>
                      <input type="text" name="address" id="address" class="form-control" value="{{ Auth::user()->address }}">
                    </div>
                    <div class="form-group">
                      <label for="city">City <span class="text-danger">*</span></label>
                      <input type="text" name="city" id="city" class="form-control" value="{{ Auth::user()->city }}">
                    </div>
                    <div class="form-group">
                      <label for="country">Country <span class="text-danger">*</span></label>
                      <select name="country" id="country" class="form-control">
                    @foreach($countries as $country_item)
                    <option value="{{ $country_item->country }}" @if($country_item->country == Auth::user()->country) selected="" @endif>{{ $country_item->country }}</option>
                    @endforeach
                    </select>
                  </div>
                  </div>
                  <!-- /.col -->

                  <div class="col-md-6">
                    <div class="font-semi-bold font-14 text-main">Contact details</div>
                    <hr>
                    <div class="form-group">
                      <label for="office_phone">Office phone <span class="text-danger">*</span></label>
                      <input type="phone" name="office_phone" id="office_phone" class="form-control" value="+3211000000">
                    </div>

                    <div class="form-group">
                      <label for="home_phone">Phone <span class="text-danger">*</span></label>
                      <input type="phone" name="home_phone" id="home_phone" class="form-control" value="+3211000000">
                    </div>

                    <div class="form-group">
                      <label for="mobile_phone">Mobile <span class="text-danger">*</span></label>
                      <input type="phone" name="mobile_phone" id="mobile_phone" class="form-control" value="+3211000000">
                    </div>

                    <div class="form-group">
                      <label for="avatar">Profile Image</label>
                      <input type="file" id="avatar" name="avatar">
                    </div>
                  </div><!-- /.col -->
                </div><!-- /.row -->

                <div class="text-right m-t-30">
                  <button type="submit" class="btn btn-primary">Save Changes</button>
                  <div class="btn btn-danger">Cancel</div>
                </div>
                </form>
              </div><!-- /.tab-pane -->
              <div class="tab-pane fade" id="changepass">
                <div class="row">
                  <div class="col-sm-12 col-md-7">
                    <div class="clearfix">&nbsp;</div>
                    <form action="{{ url('profile/changepass') }}" method="POST" class="form-horizontal">
                      <div class="form-group">
                      <label class="form-label col-md-3">Current password <span class="text-danger">*</span></label>
                       <div class="col-md-6">
                        <input type="password" name="fname" value="" class="form-control">
                      </div>
                      </div>

                      <div class="form-group">
                        <label class="form-label col-md-3">New password <span class="text-danger">*</span></label>
                        <div class="col-md-6">
                        <input type="password" name="name" value="" class="form-control">
                      </div>
                      </div>

                      <div class="form-group">
                        <label class="form-label col-md-3">Confirm new password <span class="text-danger">*</span></label>
                        <div class="col-md-6">
                        <input type="password" name="email" value="" class="form-control">
                      </div>
                      </div>
                      <div class="text-right m-t-30">
                        <button class="btn btn-primary" type="submit">Update Changes</button>
                        <div class="btn btn-danger">Cancel</div>
                      </div>
                    </form>
                  </div><!-- /.col -->
                </div><!-- /.row -->
              </div>
            </div><!-- /.tab-content -->
          </div><!-- /.content-wrap -->
        </div><!-- /.profile-wrap -->
      </div>

@endsection
