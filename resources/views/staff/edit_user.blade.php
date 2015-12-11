@extends('header')

@section('content')
<div class="page-header">
 <h2>Edit user</h2>
</div>

<div class="col-md-12">
            <ul class="nav nav-tabs tabs-float tabs-dark font-12">
              <li role="presentation" class="active"><a href="#infoTab" data-toggle="tab">General</a></li>
              <li role="presentation"><a href="#portfolioTab" data-toggle="tab">Change password</a></li>
            </ul>

            <div class="tab-content b-all no-b-t p-20 bg-white font-12">
              <div class="tab-pane fade in active" id="infoTab">
               <form action="{{ url('staff/edit/') }}" method="POST">

                <div class="row">
                  <div class="col-md-6">
                    <div class="text-blue">Account Info</div>
                    <hr class="line-dashed m-t-10 m-b-20">

                    <div class="form-group">
                      <label>User type <span class="text-danger">*</span></label>
                      <select name="team" class="form-control">
                        <option></option>
                    @foreach($roles as $role_item)
                        <option value="{{ $role_item->id }}">{{ $role_item->name }}</option>
                    @endforeach    
                      </select>
                     </div>

                    <div class="form-group">
                      <label>First name <span class="text-danger">*</span></label>
                      <input type="text" name="fname" value="{{ $user->fname }}" class="form-control">
                    </div>

                    <div class="form-group">
                      <label>Name <span class="text-danger">*</span></label>
                      <input type="text" name="name" value="{{ $user->name }}" class="form-control">
                    </div>

                    <div class="form-group">
                      <label>Email Address <span class="text-danger">*</span></label>
                      <input type="email" name="email" value="{{ $user->email }}" class="form-control">
                    </div>
                    <div class="form-group">
                      <label>Address <span class="text-danger">*</span></label>
                      <input type="email" class="form-control" value="{{ $user->address }}">
                    </div>
                    <div class="form-group">
                      <label>City <span class="text-danger">*</span></label>
                      <input type="email" class="form-control" value="{{ Auth::user()->city }}">
                    </div>
                    <div class="form-group">
                      <label>Phone <span class="text-danger">*</span></label>
                      <input type="email" class="form-control" value="(949) 123 4567">
                    </div>
                    <div class="form-group">
                      <label>About Me <span class="text-danger">*</span></label>
                      <textarea class="form-control" rows="5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eros nibh, viverra a dui a, gravida varius velit. Nunc vel tempor nisi. Aenean id pellentesque mi, non placerat mi.</textarea>
                    </div>
                  </div><!-- /.col -->
                  <div class="col-md-6">
                    <div class="font-semi-bold font-14 text-blue">
                      Department and Team 
                    </div>
                    <hr class="line-dashed">
                    <div class="form-group">
                      <label>Department <span class="text-danger">*</span></label>
                      <select name="team" class="form-control">
                        <option value=""></option>
                        <option value="101">Administration</option>
                        <option value="101">Technical support</option>
                        <option value="101">Security</option>
                      </select>
                     </div>

                    <div class="form-group">
                      <label>Team <span class="text-danger">*</span></label>
                      <select name="team" class="form-control">
                        <option value=""></option>
                        <option value="101">Team 1</option>
                        <option value="101">Team 2</option>
                        <option value="101">Team 3</option>

                        <option value="101">Team 4</option>
                        <option value="101">Team 5</option>
                        <option value="101">Team 6</option>

                      </select>
                    </div>                    


                    <div class="font-semi-bold font-14 text-blue m-t-15">Vacation hours</div>
                    <hr class="line-dashed m-t-10 m-b-20">

                    <table class="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th class="text-center">Available</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Arbeidsduur verminderings dagen</td>
                          <td class="text-center">6</td>
                        </tr>
                        <tr>
                          <td>Overtime</td>
                          <td class="text-center">15</td>
                        </tr>
                        <tr>
                          <td>Betaald verlof</td>
                          <td class="text-center">8</td>
                        </tr>
                      </tbody>
                    </table>
                  </div><!-- /.col -->
                </div><!-- /.row -->

                <div class="text-right m-t-30">
                  <div class="btn btn-primary">Save Changes</div>
                  <div class="btn btn-danger">Cancel</div>
                </div>
                </form>
              </div><!-- /.tab-pane -->
              <div class="tab-pane fade" id="portfolioTab">
                <div class="row">
                  <div class="col-sm-12 col-md-12">
                   
                </div>
              </div>
            </div><!-- /.tab-content -->
          </div><!-- /.content-wrap -->
        </div><!-- /.profile-wrap -->

@endsection