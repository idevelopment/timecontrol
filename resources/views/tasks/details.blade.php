@extends('header');
@section('content')
<style type="text/css">
	ul.messages {
  padding: 0;
}
ul.messages li, .tasks li {
  border-bottom: 1px solid #e6e6e6;
  padding: 8px 0;
}
ul.messages li img.avatar, img.avatar {
  height: 32px;
  width: 32px;
  float: left;
  display: inline-block;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  padding: 2px;
  background: #f7f7f7;
  border: 1px solid #e6e6e6;
}
ul.messages li .message_date {
  float: right;
  text-align: right;
}
ul.messages li .message_wrapper {
  margin-left: 50px;
  margin-right: 40px;
}
ul.messages li .message_wrapper h4.heading {
  font-weight: 600;
  margin: 0;
  cursor: pointer;
  margin-bottom: 10px;
  line-height: 100%;
}
ul.messages li .message_wrapper blockquote {
	padding: 5px;
	-moz-border-radius: 6px;
	-webkit-border-radius: 6px;
  margin: 0;
  background-color: #f1f1f1;
  font-size: 14px;
}
ul.user_data li {
  margin-bottom: 6px;
}
ul.user_data li p {
  margin-bottom: 0;
}
ul.user_data li .progress {
  width: 90%;
}
.split-right{
	border-right: 1px solid #e6e6e6;
}

.user_list {list-style: none;margin:0;padding:0}
.user_list li {padding:0 8px 8px; margin-bottom:8px; border-bottom: 1px dashed #dcdcdc; line-height:normal }
.user_list small {font-size: 11px;color:#9b9b9b}
</style>
<div class="page-header">
<h2>Task requests</h2>
</div>


<div class="col-lg-12">
 <div class='block block-size-medium'>
 <div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">
   <div class="col-md-8 split-right">
   <div>
   <h4>General</h4>
   <div class="clearfix">&nbsp;</div>
<form class="form-horizontal">
  <div class="form-group formSep">
    <label class="col-md-2 control-label">Type</label>
    <div class="col-sm-10">
      <p class="form-control-static">Callback</p>
    </div>
  </div>

  <div class="form-group formSep">
    <label class="col-md-2 control-label">Starts</label>
    <div class="col-sm-10">
      <p class="form-control-static">08/05/2016 08:00 am</p>
    </div>
  </div>

    <div class="form-group formSep">
    <label class="col-md-2 control-label">Ends</label>
    <div class="col-sm-10">
      <p class="form-control-static">08/05/2016 08:05 am</p>
    </div>
  </div>

    <div class="form-group formSep">
    <label class="col-md-2 control-label">Description</label>
    <div class="col-sm-10">
      <p class="form-control-static">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam imperdiet posuere lorem sit amet fringilla. Nunc placerat viverra nunc. Morbi varius libero magna, ac congue leo pellentesque at. Nunc lorem ligula, lobortis non risus sit amet, dapibus viverra metus. Etiam laoreet quam sit amet leo mollis, nec malesuada augue volutpat. Vivamus condimentum dolor ut enim laoreet mollis. Nullam vulputate magna elit, a semper quam mattis quis. Proin malesuada felis quis turpis semper vehicula. Integer vulputate ipsum sit amet cursus accumsan. Vestibulum sit amet urna mi. Sed vitae turpis justo. Phasellus ornare scelerisque eros vitae maximus. Maecenas tincidunt laoreet dui, at molestie lorem maximus at. Quisque luctus non dolor id blandit. Integer ultricies et nisl in accumsan. Praesent tincidunt quis lorem a fermentum.</p>
    </div>
  </div>

</form>
  </div>
   <div class="clearfix">&nbsp;</div>
    <div>
     <h4>Recent Activity</h4>
        <div class="clearfix">&nbsp;</div>
     <!-- end of user messages -->
     <ul class="messages">
      <li>
       <img src="{{ url('img/user_icon.png') }}" class="avatar" alt="Avatar">
       <div class="message_date">
        <h3 class="date text-info">08</h3>
                            <p class="month">May</p>
                          </div>
                          <div class="message_wrapper">
                            <h4 class="heading">Glenn Hermans</h4>
                            <blockquote class="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
                            <br />
                          </div>
                        </li>
                      </ul>
                      <!-- end of user messages -->
                    </div>
                   </div>

<div class="col-md-4">
     <h4>Assigned users</h4>
     <div class="clearfix">&nbsp;</div>
     <div class="clearfix">&nbsp;</div>
<ul class="user_list">
 
 <li>
  <span class="pull-right">
   <a href="#"><i class="fa fa-times"></i></a>
  </span>
  <a href="#">Glenn Hermans</a><br>
 </li>

  <li>
  <span class="pull-right">
   <a href="#"><i class="fa fa-times"></i></a>
  </span>
  <a href="#">Tim Joosten</a><br>
 </li>
 
 </ul>
</div>

 </div>
 </div>
 </div>
 </div>
</div>

@endsection